#!/usr/bin/env bash
set -Eeuo pipefail

# Kinetic Axis — deploy from a Mac/workstation
#
# Run locally from the project root:
#   ./deploy.sh
#
# Uses the SSH alias "pace" from ~/.ssh/config. The alias owns the host,
# user, key and SSH port, so nothing is hard-coded here.
#
# This version deliberately uses rsync rather than a macOS-created tarball.
# That avoids Apple extended-attribute/archive quirks and guarantees the
# complete src/ tree is copied to the VPS before TypeScript/build checks run.

PROJECT_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REMOTE_HOST="${REMOTE_HOST:-pace}"
REMOTE_BUILD_ROOT="${REMOTE_BUILD_ROOT:-/opt/kineticaxis-build}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
REMOTE_RELEASE="${REMOTE_BUILD_ROOT}/releases/${TIMESTAMP}"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31mERROR: %s\033[0m\n' "$*" >&2; exit 1; }

for cmd in ssh rsync openssl; do
  command -v "$cmd" >/dev/null 2>&1 || die "Required local command not found: $cmd"
done

# Catch an incomplete/incorrect local project before anything is uploaded.
for required in \
  package.json \
  analytics.sh \
  growth-auth.sh \
  tsconfig.json \
  app/layout.tsx \
  src/components/PageView.tsx \
  src/components/RouteTransitions.tsx \
  src/components/SearchClusterLinks.tsx \
  src/components/CaseStudyDepth.tsx \
  src/components/ClientConfidence.tsx \
  src/components/ConversationCTA.tsx \
  src/components/ProjectPlanner.tsx \
  src/components/ProjectEstimator.tsx \
  src/content/page-meta.ts \
  src/content/search-clusters.json \
  scripts/check-search-architecture.mjs \
  scripts/check-image-seo.mjs \
  scripts/check-conversion-authority.mjs \
  scripts/check-phase8-readiness.mjs \
  scripts/generate-seo-assets.mjs \
  scripts/check-seo.mjs \
  contact-api/analytics-report.mjs \
  contact-api/growth-summary.mjs \
  contact-api/lead-store.mjs \
  src/components/LeadDashboard.tsx \
  app/admin/leads/page.tsx \
  scripts/check-lead-management.mjs \
  deploy/server-deploy.sh; do
  [[ -f "$PROJECT_ROOT/$required" ]] || die "Required project file is missing locally: $required"
done

log "Checking SSH connection to '$REMOTE_HOST'"
REMOTE_UID="$(ssh -o ConnectTimeout=10 "$REMOTE_HOST" 'id -u')" || die "Could not connect using SSH alias '$REMOTE_HOST'."
[[ "$REMOTE_UID" == "0" ]] || die "SSH alias '$REMOTE_HOST' must log in as root. It currently reports UID $REMOTE_UID."
ok "Connected to $REMOTE_HOST as root"

if ! ssh "$REMOTE_HOST" 'test -s /etc/kineticaxis/growth.htpasswd'; then
  log "Setting up growth dashboard username/password"
  printf 'Username [admin]: '
  IFS= read -r GROWTH_ADMIN_USER || true
  GROWTH_ADMIN_USER="${GROWTH_ADMIN_USER:-admin}"
  [[ "$GROWTH_ADMIN_USER" =~ ^[A-Za-z0-9._-]+$ ]] || die "Growth admin username may contain only letters, numbers, dot, underscore and hyphen."
  printf 'Password: '
  IFS= read -r -s GROWTH_ADMIN_PASSWORD || true
  printf '\n'
  [[ -n "$GROWTH_ADMIN_PASSWORD" ]] || die "Growth admin password cannot be empty."
  GROWTH_ADMIN_HASH="$(printf '%s\n' "$GROWTH_ADMIN_PASSWORD" | openssl passwd -apr1 -stdin)"
  printf '%s:%s\n' "$GROWTH_ADMIN_USER" "$GROWTH_ADMIN_HASH" | ssh "$REMOTE_HOST" 'install -d -m 0750 -o root -g www-data /etc/kineticaxis && cat > /etc/kineticaxis/growth.htpasswd && chown root:www-data /etc/kineticaxis/growth.htpasswd && chmod 0640 /etc/kineticaxis/growth.htpasswd'
  unset GROWTH_ADMIN_PASSWORD GROWTH_ADMIN_HASH
  ok "Growth dashboard credentials stored as a server-side password hash"
fi

log "Preparing remote release"
ssh "$REMOTE_HOST" "mkdir -p '$REMOTE_BUILD_ROOT/releases' && rm -rf '$REMOTE_RELEASE' && mkdir -p '$REMOTE_RELEASE'"

log "Uploading project source to $REMOTE_HOST"
rsync -az --delete \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='out/' \
  --exclude='.git/' \
  --exclude='.DS_Store' \
  --exclude='contact-api/node_modules/' \
  --exclude='contact-api/.env' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='*.log' \
  "$PROJECT_ROOT/" "${REMOTE_HOST}:${REMOTE_RELEASE}/"
ok "Upload complete"

log "Verifying uploaded source"
ssh "$REMOTE_HOST" "\
  test -f '$REMOTE_RELEASE/package.json' && \
  test -x '$REMOTE_RELEASE/analytics.sh' && \
  test -f '$REMOTE_RELEASE/tsconfig.json' && \
  test -f '$REMOTE_RELEASE/src/components/PageView.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/RouteTransitions.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/SearchClusterLinks.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/CaseStudyDepth.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/ClientConfidence.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/ConversationCTA.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/ProjectPlanner.tsx' && \
  test -f '$REMOTE_RELEASE/src/components/ProjectEstimator.tsx' && \
  test -f '$REMOTE_RELEASE/src/content/page-meta.ts' && \
  test -f '$REMOTE_RELEASE/src/content/search-clusters.json' && \
  test -f '$REMOTE_RELEASE/scripts/check-search-architecture.mjs' && \
  test -f '$REMOTE_RELEASE/scripts/check-image-seo.mjs' && \
  test -f '$REMOTE_RELEASE/scripts/check-conversion-authority.mjs' && \
  test -f '$REMOTE_RELEASE/scripts/check-phase8-readiness.mjs' && \
  test -f '$REMOTE_RELEASE/scripts/generate-seo-assets.mjs' && \
  test -f '$REMOTE_RELEASE/scripts/check-seo.mjs' && \
  test -f '$REMOTE_RELEASE/contact-api/analytics-report.mjs' && \
  test -f '$REMOTE_RELEASE/contact-api/growth-summary.mjs' && \
  test -f '$REMOTE_RELEASE/contact-api/lead-store.mjs' && \
  test -f '$REMOTE_RELEASE/src/components/LeadDashboard.tsx' && \
  test -f '$REMOTE_RELEASE/app/admin/leads/page.tsx' && \
  test -f '$REMOTE_RELEASE/scripts/check-lead-management.mjs' && \
  test -f '$REMOTE_RELEASE/deploy/server-deploy.sh'\
" || die "Remote source verification failed. The production deploy has NOT started."
ok "Remote source tree verified"

log "Deploying on VPS"
ssh "$REMOTE_HOST" "chmod +x '$REMOTE_RELEASE/deploy/server-deploy.sh' && cd '$REMOTE_RELEASE' && ./deploy/server-deploy.sh"

# Only mark a release current after a completely successful production deploy.
ssh "$REMOTE_HOST" "\
  ln -sfn '$REMOTE_RELEASE' '$REMOTE_BUILD_ROOT/current' && \
  find '$REMOTE_BUILD_ROOT/releases' -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\\n' \
    | sort -nr \
    | tail -n +4 \
    | cut -d' ' -f2- \
    | while IFS= read -r old_release; do \
        if [ -n \"\$old_release\" ] && [ \"\$old_release\" != '$REMOTE_RELEASE' ]; then rm -rf -- \"\$old_release\"; fi; \
      done\
"

ok "Production deployment completed"
printf '\nWebsite : https://kineticaxisdigital.com\n'
printf 'SSH host : %s\n' "$REMOTE_HOST"
printf 'Source   : %s\n' "$REMOTE_RELEASE"
printf 'Current  : %s/current\n' "$REMOTE_BUILD_ROOT"
