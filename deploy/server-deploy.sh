#!/usr/bin/env bash
set -Eeuo pipefail

# Kinetic Axis production deploy
#
# Deploys this project to the existing Kinetic Axis VPS layout:
#   Static Next.js export : /var/www/kineticaxisdigital
#   Contact API           : /opt/kineticaxis-contact
#   Contact API env       : /etc/kineticaxis/contact.env (NEVER overwritten)
#   systemd service       : /etc/systemd/system/kineticaxis-contact.service
#
# Nginx TLS/server blocks are deliberately NOT overwritten. This protects the
# live .com/.co.uk redirects, certificates, monitoring hosts and unrelated
# Pace Venues configuration already present on the VPS.

PROJECT_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
STATIC_ROOT="${STATIC_ROOT:-/var/www/kineticaxisdigital}"
API_ROOT="${API_ROOT:-/opt/kineticaxis-contact}"
ENV_FILE="${ENV_FILE:-/etc/kineticaxis/contact.env}"
SITE_ENV_FILE="${SITE_ENV_FILE:-/etc/kineticaxis/site.env}"
SERVICE_NAME="kineticaxis-contact"
SERVICE_SOURCE="$PROJECT_ROOT/deploy/kineticaxis-contact.service"
SERVICE_TARGET="/etc/systemd/system/${SERVICE_NAME}.service"
BACKUP_BASE="${BACKUP_BASE:-/var/backups/kineticaxisdigital}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_DIR="$BACKUP_BASE/$TIMESTAMP"
STATIC_STAGE=""
API_STAGE=""
PERF_TMP=""
API_PREVIOUS="${API_ROOT}.previous"
STATIC_PREVIOUS="${STATIC_ROOT}.previous"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m! %s\033[0m\n' "$*" >&2; }
die()  { printf '\033[1;31mERROR: %s\033[0m\n' "$*" >&2; exit 1; }

cleanup() {
  [[ -n "$STATIC_STAGE" && -d "$STATIC_STAGE" ]] && rm -rf -- "$STATIC_STAGE" || true
  [[ -n "$API_STAGE" && -d "$API_STAGE" ]] && rm -rf -- "$API_STAGE" || true
  [[ -n "$PERF_TMP" && -d "$PERF_TMP" ]] && rm -rf -- "$PERF_TMP" || true
}
trap cleanup EXIT

[[ "${EUID:-$(id -u)}" -eq 0 ]] || die "Run this deploy as root: sudo ./deploy.sh"

for cmd in node npm rsync systemctl curl nginx tar install grep find readlink dirname; do
  command -v "$cmd" >/dev/null 2>&1 || die "Required command not found: $cmd"
done

[[ -x /usr/sbin/sendmail ]] || die "/usr/sbin/sendmail is missing; the contact API requires the local Postfix sendmail binary."
[[ -f "$PROJECT_ROOT/package.json" ]] || die "package.json not found in $PROJECT_ROOT"
[[ -f "$PROJECT_ROOT/src/components/PageView.tsx" ]] || die "src/components/PageView.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/src/components/RouteTransitions.tsx" ]] || die "src/components/RouteTransitions.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/src/components/SearchClusterLinks.tsx" ]] || die "src/components/SearchClusterLinks.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/src/components/CaseStudyDepth.tsx" ]] || die "src/components/CaseStudyDepth.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/src/components/ClientConfidence.tsx" ]] || die "src/components/ClientConfidence.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/src/components/ConversationCTA.tsx" ]] || die "src/components/ConversationCTA.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/scripts/check-conversion-authority.mjs" ]] || die "scripts/check-conversion-authority.mjs is missing from this release."
[[ -f "$PROJECT_ROOT/scripts/check-phase8-readiness.mjs" ]] || die "scripts/check-phase8-readiness.mjs is missing from this release."
[[ -f "$PROJECT_ROOT/src/components/ProjectPlanner.tsx" ]] || die "src/components/ProjectPlanner.tsx is missing from this release."
[[ -f "$PROJECT_ROOT/src/content/page-meta.ts" ]] || die "src/content/page-meta.ts is missing from this release."
[[ -f "$PROJECT_ROOT/src/content/search-clusters.json" ]] || die "src/content/search-clusters.json is missing from this release."
[[ -f "$PROJECT_ROOT/contact-api/server.mjs" ]] || die "contact-api/server.mjs is missing."
[[ -f "$PROJECT_ROOT/contact-api/analytics-report.mjs" ]] || die "contact-api/analytics-report.mjs is missing."
[[ -f "$PROJECT_ROOT/contact-api/growth-summary.mjs" ]] || die "contact-api/growth-summary.mjs is missing."
[[ -f "$PROJECT_ROOT/contact-api/lead-store.mjs" ]] || die "contact-api/lead-store.mjs is missing."
[[ -f "$PROJECT_ROOT/src/components/LeadDashboard.tsx" ]] || die "src/components/LeadDashboard.tsx is missing."
[[ -f "$PROJECT_ROOT/app/admin/leads/page.tsx" ]] || die "app/admin/leads/page.tsx is missing."
[[ -f "$PROJECT_ROOT/src/components/ProjectEstimator.tsx" ]] || die "src/components/ProjectEstimator.tsx is missing."
[[ -f "$PROJECT_ROOT/contact-api/package.json" ]] || die "contact-api/package.json is missing."
[[ -f "$PROJECT_ROOT/shared/project-categories.json" ]] || die "shared/project-categories.json is missing."
[[ -f "$SERVICE_SOURCE" ]] || die "Missing service definition: $SERVICE_SOURCE"
[[ -f "$ENV_FILE" ]] || die "Missing live environment file: $ENV_FILE. Create it from contact-api/.env.example first."

grep -q '^SMTP_FROM=' "$ENV_FILE" || die "$ENV_FILE is missing SMTP_FROM."
grep -q '^CONTACT_TO=' "$ENV_FILE" || die "$ENV_FILE is missing CONTACT_TO."

# These are the production values proven against the live Kinetic Axis mailbox.
# Preserve the server-side env file, but transparently migrate the previous brand
# display name so a text-only brand cleanup can never block a deployment.
EXPECTED_SMTP_FROM='Kinetic Axis <carl@kineticaxisdigital.co.uk>'
CURRENT_SMTP_FROM="$(sed -n 's/^SMTP_FROM=//p' "$ENV_FILE" | head -n1)"
case "$CURRENT_SMTP_FROM" in
  "$EXPECTED_SMTP_FROM")
    ;;
  'Kinetic Axis Digital <carl@kineticaxisdigital.co.uk>'|'carl@kineticaxisdigital.co.uk')
    log "Updating contact sender display name in $ENV_FILE"
    sed -i "s|^SMTP_FROM=.*$|SMTP_FROM=$EXPECTED_SMTP_FROM|" "$ENV_FILE"
    ;;
  *)
    die "$ENV_FILE SMTP_FROM must use carl@kineticaxisdigital.co.uk (expected: $EXPECTED_SMTP_FROM)"
    ;;
esac

grep -Fxq 'CONTACT_TO=carl@kineticaxisdigital.co.uk' "$ENV_FILE" || \
  die "$ENV_FILE CONTACT_TO must be: carl@kineticaxisdigital.co.uk"
if grep -Eq '^NoNewPrivileges[[:space:]]*=[[:space:]]*true' "$SERVICE_SOURCE"; then
  die "The service file enables NoNewPrivileges=true, which breaks Postfix postdrop for this API."
fi
chmod 600 "$ENV_FILE"
if grep -q '^GROWTH_DASHBOARD_TOKEN=' "$ENV_FILE"; then
  sed -i '/^GROWTH_DASHBOARD_TOKEN=/d' "$ENV_FILE"
  ok "Removed obsolete growth dashboard bearer token from $ENV_FILE"
fi

# Growth dashboard authentication is handled by Nginx Basic Auth.
# The password file is created by deploy.sh / growth-auth.sh and never stored in the release.
GROWTH_HTPASSWD="/etc/kineticaxis/growth.htpasswd"
[[ -s "$GROWTH_HTPASSWD" ]] || die "Missing $GROWTH_HTPASSWD. Run ./growth-auth.sh locally once, then deploy again."
chmod 640 "$GROWTH_HTPASSWD"
chown root:www-data "$GROWTH_HTPASSWD" 2>/dev/null || true

# First-party conversion analytics are stored outside the release directory so
# deployment/rollback never destroys launch data. The log contains only the
# allowlisted interaction metadata produced by the site; no form values or visitor IDs.
ANALYTICS_DIR="${ANALYTICS_DIR:-/var/lib/kineticaxis/analytics}"
install -d -o www-data -g www-data -m 0750 "$ANALYTICS_DIR"
touch "$ANALYTICS_DIR/events.ndjson" "$ANALYTICS_DIR/leads.ndjson"
chown www-data:www-data "$ANALYTICS_DIR/events.ndjson" "$ANALYTICS_DIR/leads.ndjson"
chmod 0640 "$ANALYTICS_DIR/events.ndjson" "$ANALYTICS_DIR/leads.ndjson"
if command -v logrotate >/dev/null 2>&1 && [[ -f "$PROJECT_ROOT/deploy/kineticaxis-analytics.logrotate" ]]; then
  install -m 0644 "$PROJECT_ROOT/deploy/kineticaxis-analytics.logrotate" /etc/logrotate.d/kineticaxis-analytics
fi

# Private lead-management data contains contact details, notes and follow-up state.
# Keep it outside the release tree, readable only by the service account/root, and
# do not rotate it like anonymous analytics because the event history is the CRM record.
LEAD_PIPELINE_LOG_PATH="$(sed -n 's/^LEAD_PIPELINE_LOG_PATH=//p' "$ENV_FILE" | head -n1)"
LEAD_PIPELINE_LOG_PATH="${LEAD_PIPELINE_LOG_PATH:-/var/lib/kineticaxis/leads/activity.ndjson}"
LEAD_PIPELINE_DIR="$(dirname "$LEAD_PIPELINE_LOG_PATH")"
install -d -o www-data -g www-data -m 0750 "$LEAD_PIPELINE_DIR"
touch "$LEAD_PIPELINE_LOG_PATH"
chown www-data:www-data "$LEAD_PIPELINE_LOG_PATH"
chmod 0640 "$LEAD_PIPELINE_LOG_PATH"

log "Pre-flight"
printf 'Project        : %s\n' "$PROJECT_ROOT"
printf 'Static site    : %s\n' "$STATIC_ROOT"
printf 'Contact API    : %s\n' "$API_ROOT"
printf 'Environment    : %s (preserved)\n' "$ENV_FILE"
printf 'Backup         : %s\n' "$BACKUP_DIR"
printf 'Node           : %s\n' "$(node --version)"
printf 'npm            : %s\n' "$(npm --version)"

log "Checking Nginx configuration"
nginx -t
NGINX_DUMP="$(nginx -T 2>&1 || true)"
if ! grep -Fq "root $STATIC_ROOT;" <<<"$NGINX_DUMP"; then
  warn "Could not confirm Nginx root '$STATIC_ROOT' in nginx -T output. Deployment will continue without editing Nginx."
fi
if ! grep -Fq '127.0.0.1:4319/api/contact' <<<"$NGINX_DUMP"; then
  warn "Could not confirm the /api/contact proxy to 127.0.0.1:4319. Deployment will continue without editing that route."
fi
if ! grep -Fq '127.0.0.1:4319/api/events' <<<"$NGINX_DUMP"; then
  warn "The dedicated /api/events proxy is not present yet; this release will add it safely after creating the rollback backup."
fi
if ! grep -Fq '127.0.0.1:4319/api/growth-summary' <<<"$NGINX_DUMP"; then
  warn "The /api/growth-summary proxy is not present yet; this release will add it with username/password protection after creating the rollback backup."
fi
if ! grep -Fq '127.0.0.1:4319/api/leads' <<<"$NGINX_DUMP"; then
  warn "The protected /api/leads proxy is not present yet; this release will add it using the existing admin credentials."
fi

if [[ -f "$SITE_ENV_FILE" ]]; then
  log "Loading optional site verification settings"
  set -a
  # shellcheck disable=SC1090
  source "$SITE_ENV_FILE"
  set +a
  ok "Loaded $SITE_ENV_FILE"
fi

log "Installing frontend dependencies"
cd "$PROJECT_ROOT"
if [[ -f package-lock.json ]]; then
  npm ci --no-audit --no-fund
else
  warn "package-lock.json is not present in this source package; using npm install with the pinned direct dependency versions."
  npm install --no-audit --no-fund
fi

log "Running project checks"
npm run typecheck
npm run test:content
npm run test:routes
npm run seo:generate
npm run test:seo
npm run test:architecture
npm run test:images
npm run test:conversion
npm run test:phase8

log "Building Next.js static export"
export NEXT_PUBLIC_KA_ASSET_VERSION="$TIMESTAMP"
printf 'Route CSS ver. : %s\n' "$NEXT_PUBLIC_KA_ASSET_VERSION"
npm run build
[[ -f "$PROJECT_ROOT/out/index.html" ]] || die "Build completed but out/index.html was not created."
[[ -f "$PROJECT_ROOT/out/404.html" ]] || die "Build completed but out/404.html was not created."
[[ -f "$PROJECT_ROOT/out/web-app-development-birmingham.html" ]] || die "Build completed but the Birmingham landing page was not exported."
npm run export:verify

log "Creating rollback backup"
mkdir -p "$BACKUP_DIR"
if [[ -d "$STATIC_ROOT" ]]; then
  tar -C "$(dirname "$STATIC_ROOT")" -czf "$BACKUP_DIR/static-site.tar.gz" "$(basename "$STATIC_ROOT")"
fi
if [[ -d "$API_ROOT" ]]; then
  tar -C "$(dirname "$API_ROOT")" -czf "$BACKUP_DIR/contact-api.tar.gz" "$(basename "$API_ROOT")"
fi
if [[ -f "$SERVICE_TARGET" ]]; then
  cp -a "$SERVICE_TARGET" "$BACKUP_DIR/kineticaxis-contact.service"
fi
ok "Backup created at $BACKUP_DIR"

# Analytics now uses a dedicated /api/events endpoint. Older Kinetic Axis Nginx
# configs only contain /api/contact, so migrate that one location automatically
# and keep a rollback copy alongside the release backup.
NGINX_DUMP="$(nginx -T 2>&1 || true)"
if ! grep -Fq '127.0.0.1:4319/api/events' <<<"$NGINX_DUMP"; then
  log "Adding dedicated /api/events Nginx proxy"
  KINETIC_NGINX_CONFIG=""
  for nginx_dir in /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx/sites-available; do
    [[ -d "$nginx_dir" ]] || continue
    while IFS= read -r candidate; do
      target="$(readlink -f "$candidate" 2>/dev/null || true)"
      [[ -n "$target" && -f "$target" ]] || continue
      if grep -Fq 'kineticaxisdigital.com' "$target" && grep -Fq 'location = /api/contact' "$target"; then
        KINETIC_NGINX_CONFIG="$target"
        break 2
      fi
    done < <(find "$nginx_dir" -maxdepth 1 \( -type f -o -type l \) -print 2>/dev/null)
  done

  [[ -n "$KINETIC_NGINX_CONFIG" ]] || die "Could not locate the active Kinetic Axis Nginx server block to add /api/events."
  cp -a "$KINETIC_NGINX_CONFIG" "$BACKUP_DIR/nginx-before-events.conf"

  node - "$KINETIC_NGINX_CONFIG" <<'NODE'
const fs=require('node:fs');
const file=process.argv[2];
let source=fs.readFileSync(file,'utf8');
if(source.includes('location = /api/events')) process.exit(0);
const match=source.match(/^([ \t]*)location = \/api\/contact[ \t]*\{/m);
if(!match) throw new Error('Could not find the exact /api/contact location block.');
const indent=match[1];
const block=[
  `${indent}location = /api/events {`,
  `${indent}    limit_except POST { deny all; }`,
  `${indent}    proxy_pass http://127.0.0.1:4319/api/events;`,
  `${indent}    proxy_http_version 1.1;`,
  `${indent}    proxy_set_header Host $host;`,
  `${indent}    proxy_set_header X-Real-IP $remote_addr;`,
  `${indent}    proxy_set_header X-Forwarded-Proto $scheme;`,
  `${indent}    proxy_connect_timeout 5s;`,
  `${indent}    proxy_read_timeout 10s;`,
  `${indent}    client_max_body_size 4k;`,
  `${indent}}`,
  '',
].join('\n');
source=source.replace(match[0],block+match[0]);
fs.writeFileSync(file,source);
NODE

  if ! nginx -t; then
    cp -a "$BACKUP_DIR/nginx-before-events.conf" "$KINETIC_NGINX_CONFIG"
    nginx -t || true
    die "Adding /api/events made Nginx invalid; the original Nginx config was restored."
  fi
  systemctl reload nginx
  ok "Added /api/events proxy in $KINETIC_NGINX_CONFIG"
else
  ok "Dedicated /api/events Nginx proxy already present"
fi

NGINX_DUMP="$(nginx -T 2>&1 || true)"
if ! grep -Fq '127.0.0.1:4319/api/estimate-email' <<<"$NGINX_DUMP"; then
  log "Adding /api/estimate-email Nginx proxy"
  KINETIC_NGINX_CONFIG=""
  for nginx_dir in /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx/sites-available; do
    [[ -d "$nginx_dir" ]] || continue
    while IFS= read -r candidate; do
      target="$(readlink -f "$candidate" 2>/dev/null || true)"
      [[ -n "$target" && -f "$target" ]] || continue
      if grep -Fq 'kineticaxisdigital.com' "$target" && grep -Fq 'location = /api/contact' "$target"; then
        KINETIC_NGINX_CONFIG="$target"
        break 2
      fi
    done < <(find "$nginx_dir" -maxdepth 1 \( -type f -o -type l \) -print 2>/dev/null)
  done

  [[ -n "$KINETIC_NGINX_CONFIG" ]] || die "Could not locate the active Kinetic Axis Nginx server block to add /api/estimate-email."
  cp -a "$KINETIC_NGINX_CONFIG" "$BACKUP_DIR/nginx-before-estimate-email.conf"

  node - "$KINETIC_NGINX_CONFIG" <<'NODE'
const fs=require('node:fs');
const file=process.argv[2];
let source=fs.readFileSync(file,'utf8');
if(source.includes('location = /api/estimate-email')) process.exit(0);
const match=source.match(/^([ \t]*)location = \/api\/contact[ \t]*\{/m);
if(!match) throw new Error('Could not find the exact /api/contact location block.');
const indent=match[1];
const block=[
  `${indent}location = /api/estimate-email {`,
  `${indent}    limit_except POST { deny all; }`,
  `${indent}    proxy_pass http://127.0.0.1:4319/api/estimate-email;`,
  `${indent}    proxy_http_version 1.1;`,
  `${indent}    proxy_set_header Host $host;`,
  `${indent}    proxy_set_header X-Real-IP $remote_addr;`,
  `${indent}    proxy_set_header X-Forwarded-Proto $scheme;`,
  `${indent}    proxy_connect_timeout 5s;`,
  `${indent}    proxy_read_timeout 20s;`,
  `${indent}    client_max_body_size 8k;`,
  `${indent}}`,
  '',
].join('\n');
source=source.replace(match[0],block+match[0]);
fs.writeFileSync(file,source);
NODE

  if ! nginx -t; then
    cp -a "$BACKUP_DIR/nginx-before-estimate-email.conf" "$KINETIC_NGINX_CONFIG"
    nginx -t || true
    die "Adding /api/estimate-email made Nginx invalid; the original Nginx config was restored."
  fi
  systemctl reload nginx
  ok "Added /api/estimate-email proxy in $KINETIC_NGINX_CONFIG"
else
  ok "Dedicated /api/estimate-email Nginx proxy already present"
fi

NGINX_DUMP="$(nginx -T 2>&1 || true)"
log "Ensuring username/password protection for the growth dashboard"
KINETIC_NGINX_CONFIG=""
for nginx_dir in /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx/sites-available; do
  [[ -d "$nginx_dir" ]] || continue
  while IFS= read -r candidate; do
    target="$(readlink -f "$candidate" 2>/dev/null || true)"
    [[ -n "$target" && -f "$target" ]] || continue
    if grep -Fq 'kineticaxisdigital.com' "$target" && grep -Fq 'location = /api/contact' "$target"; then
      KINETIC_NGINX_CONFIG="$target"
      break 2
    fi
  done < <(find "$nginx_dir" -maxdepth 1 \( -type f -o -type l \) -print 2>/dev/null)
done
[[ -n "$KINETIC_NGINX_CONFIG" ]] || die "Could not locate the active Kinetic Axis Nginx server block to protect the growth dashboard."
cp -a "$KINETIC_NGINX_CONFIG" "$BACKUP_DIR/nginx-before-growth-auth.conf"

node - "$KINETIC_NGINX_CONFIG" <<'NODE'
const fs=require('node:fs');
const file=process.argv[2];
let source=fs.readFileSync(file,'utf8');
const auth=[
  '    auth_basic "Kinetic Axis Growth";',
  '    auth_basic_user_file /etc/kineticaxis/growth.htpasswd;',
].join('\n');

function ensureApi(){
  const existing=/location = \/api\/growth-summary\s*\{[\s\S]*?^[ \t]*\}/m;
  const match=source.match(existing);
  if(match){
    let block=match[0];
    block=block.replace(/^\s*proxy_set_header Authorization \$http_authorization;\s*$/m,'');
    if(!block.includes('auth_basic_user_file /etc/kineticaxis/growth.htpasswd;')){
      block=block.replace(/(location = \/api\/growth-summary\s*\{)/,`$1\n${auth}`);
    }
    source=source.replace(match[0],block);
    return;
  }
  const contact=source.match(/^([ \t]*)location = \/api\/contact[ \t]*\{/m);
  if(!contact) throw new Error('Could not find the exact /api/contact location block.');
  const indent=contact[1];
  const block=[
    `${indent}location = /api/growth-summary {`,
    `${indent}    auth_basic "Kinetic Axis Growth";`,
    `${indent}    auth_basic_user_file /etc/kineticaxis/growth.htpasswd;`,
    `${indent}    limit_except GET { deny all; }`,
    `${indent}    proxy_pass http://127.0.0.1:4319/api/growth-summary;`,
    `${indent}    proxy_http_version 1.1;`,
    `${indent}    proxy_set_header Host $host;`,
    `${indent}    proxy_set_header X-Real-IP $remote_addr;`,
    `${indent}    proxy_set_header X-Forwarded-Proto $scheme;`,
    `${indent}    proxy_connect_timeout 5s;`,
    `${indent}    proxy_read_timeout 10s;`,
    `${indent}}`,
    '',
  ].join('\n');
  source=source.replace(contact[0],block+contact[0]);
}

function ensureAdmin(){
  const re=/location \^~ \/admin\/growth\s*\{[\s\S]*?^[ \t]*\}/m;
  const match=source.match(re);
  if(match){
    let block=match[0];
    if(!block.includes('auth_basic_user_file /etc/kineticaxis/growth.htpasswd;')){
      block=block.replace(/(location \^~ \/admin\/growth\s*\{)/,`$1\n${auth}`);
    }
    source=source.replace(match[0],block);
    return;
  }
  const anchor=source.match(/^([ \t]*)location \/ \{/m);
  if(!anchor) throw new Error('Could not find the main static location block.');
  const indent=anchor[1];
  const block=[
    `${indent}location ^~ /admin/growth {`,
    `${indent}    auth_basic "Kinetic Axis Growth";`,
    `${indent}    auth_basic_user_file /etc/kineticaxis/growth.htpasswd;`,
    `${indent}    try_files $uri $uri.html /admin/growth.html =404;`,
    `${indent}}`,
    '',
  ].join('\n');
  source=source.replace(anchor[0],block+anchor[0]);
}

function ensureLeadsApi(){
  const existing=/location = \/api\/leads\s*\{[\s\S]*?^[ \t]*\}/m;
  const match=source.match(existing);
  if(match){
    let block=match[0];
    if(!block.includes('auth_basic_user_file /etc/kineticaxis/growth.htpasswd;'))block=block.replace(/(location = \/api\/leads\s*\{)/,`$1\n${auth}`);
    source=source.replace(match[0],block);return;
  }
  const contact=source.match(/^([ \t]*)location = \/api\/contact[ \t]*\{/m);
  if(!contact) throw new Error('Could not find the exact /api/contact location block for leads.');
  const indent=contact[1];
  const block=[
    `${indent}location = /api/leads {`,
    `${indent}    auth_basic "Kinetic Axis Growth";`,
    `${indent}    auth_basic_user_file /etc/kineticaxis/growth.htpasswd;`,
    `${indent}    limit_except GET POST { deny all; }`,
    `${indent}    proxy_pass http://127.0.0.1:4319/api/leads;`,
    `${indent}    proxy_http_version 1.1;`,
    `${indent}    proxy_set_header Host $host;`,
    `${indent}    proxy_set_header X-Real-IP $remote_addr;`,
    `${indent}    proxy_set_header X-Forwarded-Proto $scheme;`,
    `${indent}    proxy_connect_timeout 5s;`,
    `${indent}    proxy_read_timeout 10s;`,
    `${indent}    client_max_body_size 8k;`,
    `${indent}}`,
    '',
  ].join('\n');
  source=source.replace(contact[0],block+contact[0]);
}

function ensureLeadsAdmin(){
  const re=/location \^~ \/admin\/leads\s*\{[\s\S]*?^[ \t]*\}/m;
  const match=source.match(re);
  if(match){
    let block=match[0];
    if(!block.includes('auth_basic_user_file /etc/kineticaxis/growth.htpasswd;'))block=block.replace(/(location \^~ \/admin\/leads\s*\{)/,`$1\n${auth}`);
    source=source.replace(match[0],block);return;
  }
  const anchor=source.match(/^([ \t]*)location \/ \{/m);
  if(!anchor) throw new Error('Could not find the main static location block for leads.');
  const indent=anchor[1];
  const block=[
    `${indent}location ^~ /admin/leads {`,
    `${indent}    auth_basic "Kinetic Axis Growth";`,
    `${indent}    auth_basic_user_file /etc/kineticaxis/growth.htpasswd;`,
    `${indent}    try_files $uri $uri.html /admin/leads.html =404;`,
    `${indent}}`,
    '',
  ].join('\n');
  source=source.replace(anchor[0],block+anchor[0]);
}

function ensureSeoRedirects(){
  const marker='# SEO: extensionless URLs are canonical';
  if(source.includes(marker)) return;
  const rootMatch=source.match(/^[ \t]*root \/var\/www\/kineticaxisdigital;[ \t]*$/m);
  if(!rootMatch) throw new Error('Could not find the kineticaxisdigital Nginx root directive.');
  const from=rootMatch.index+rootMatch[0].length;
  const blockMatch=source.slice(from).match(/^[ \t]*location \/ \{[^\n]*\n[ \t]*try_files \$uri\.html[^\n]*$/m);
  if(!blockMatch) throw new Error('Could not find the kineticaxisdigital static location block.');
  const at=from+blockMatch.index;
  const indent=(blockMatch[0].match(/^[ \t]*/)||[''])[0];
  const block=[
    '',
    `${indent}# SEO: extensionless URLs are canonical. Collapse .html paths and`,
    `${indent}# trailing-slash variants onto them so crawlers see one URL per page.`,
    `${indent}location = /index.html { return 301 /$is_args$args; }`,
    `${indent}location ~ ^/(.+)\\.html$ { return 301 /$1$is_args$args; }`,
    `${indent}location ~ ^(.+)/$ { return 301 $1$is_args$args; }`,
    '',
  ].join('\n');
  source=source.slice(0,at)+block+source.slice(at);
}

ensureApi();
ensureAdmin();
ensureLeadsApi();
ensureLeadsAdmin();
ensureSeoRedirects();
fs.writeFileSync(file,source);
NODE

if ! nginx -t; then
  cp -a "$BACKUP_DIR/nginx-before-growth-auth.conf" "$KINETIC_NGINX_CONFIG"
  nginx -t || true
  die "Growth dashboard auth changes made Nginx invalid; the original Nginx config was restored."
fi
systemctl reload nginx
ok "Growth dashboard protected with Nginx username/password authentication"

log "Preparing contact API release"
API_STAGE="$(mktemp -d /opt/kineticaxis-contact.deploy.XXXXXX)"
rsync -a --delete \
  --exclude='node_modules/' \
  --exclude='.env' \
  "$PROJECT_ROOT/contact-api/" "$API_STAGE/"
install -m 0644 "$PROJECT_ROOT/shared/project-categories.json" "$API_STAGE/project-categories.json"

cd "$API_STAGE"
npm install --omit=dev --no-audit --no-fund
node --check server.mjs

log "Deploying contact API"
systemctl stop "$SERVICE_NAME" 2>/dev/null || true
rm -rf -- "$API_PREVIOUS"
if [[ -d "$API_ROOT" ]]; then
  mv -- "$API_ROOT" "$API_PREVIOUS"
fi
mv -- "$API_STAGE" "$API_ROOT"
API_STAGE=""

install -m 0644 "$SERVICE_SOURCE" "$SERVICE_TARGET"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME" >/dev/null

if ! systemctl restart "$SERVICE_NAME"; then
  warn "Contact API failed to restart; rolling the API directory back."
  systemctl stop "$SERVICE_NAME" 2>/dev/null || true
  rm -rf -- "$API_ROOT"
  if [[ -d "$API_PREVIOUS" ]]; then
    mv -- "$API_PREVIOUS" "$API_ROOT"
  fi
  if [[ -f "$BACKUP_DIR/kineticaxis-contact.service" ]]; then
    cp -a "$BACKUP_DIR/kineticaxis-contact.service" "$SERVICE_TARGET"
    systemctl daemon-reload
  fi
  systemctl restart "$SERVICE_NAME" 2>/dev/null || true
  die "Contact API deployment failed and was rolled back."
fi

CONTACT_PORT="$(grep -m1 '^CONTACT_PORT=' "$ENV_FILE" | cut -d= -f2- | tr -d '[:space:]' || true)"
CONTACT_PORT="${CONTACT_PORT:-4319}"

API_HEALTH_OK=0
for _ in {1..15}; do
  if curl --silent --show-error --fail --max-time 2 "http://127.0.0.1:${CONTACT_PORT}/health" >/dev/null; then
    API_HEALTH_OK=1
    break
  fi
  sleep 1
done

if [[ "$API_HEALTH_OK" -ne 1 ]]; then
  warn "Contact API health check failed; rolling the API directory back."
  journalctl -u "$SERVICE_NAME" -n 30 --no-pager || true
  systemctl stop "$SERVICE_NAME" 2>/dev/null || true
  rm -rf -- "$API_ROOT"
  if [[ -d "$API_PREVIOUS" ]]; then
    mv -- "$API_PREVIOUS" "$API_ROOT"
  fi
  if [[ -f "$BACKUP_DIR/kineticaxis-contact.service" ]]; then
    cp -a "$BACKUP_DIR/kineticaxis-contact.service" "$SERVICE_TARGET"
    systemctl daemon-reload
  fi
  systemctl restart "$SERVICE_NAME" 2>/dev/null || true
  die "Contact API health check failed and was rolled back."
fi
ok "Contact API healthy on 127.0.0.1:${CONTACT_PORT}"

log "Preparing static site release"
mkdir -p "$(dirname "$STATIC_ROOT")"
STATIC_STAGE="$(mktemp -d "$(dirname "$STATIC_ROOT")/kineticaxisdigital.deploy.XXXXXX")"
rsync -a --delete "$PROJECT_ROOT/out/" "$STATIC_STAGE/"
chown -R www-data:www-data "$STATIC_STAGE"
find "$STATIC_STAGE" -type d -exec chmod 0755 {} +
find "$STATIC_STAGE" -type f -exec chmod 0644 {} +

log "Publishing static site"
rm -rf -- "$STATIC_PREVIOUS"
if [[ -d "$STATIC_ROOT" ]]; then
  mv -- "$STATIC_ROOT" "$STATIC_PREVIOUS"
fi
mv -- "$STATIC_STAGE" "$STATIC_ROOT"
STATIC_STAGE=""

# Nginx configuration is intentionally preserved; validate it once more after
# the content swap. Static content changes do not require an Nginx restart.
if ! nginx -t; then
  warn "Nginx validation failed after publish; rolling static content back."
  rm -rf -- "$STATIC_ROOT"
  if [[ -d "$STATIC_PREVIOUS" ]]; then
    mv -- "$STATIC_PREVIOUS" "$STATIC_ROOT"
  fi
  die "Static deployment rolled back because nginx -t failed."
fi

# The .previous directories are no longer needed because a timestamped backup
# was already created above.
rm -rf -- "$API_PREVIOUS" "$STATIC_PREVIOUS"

log "Final checks"
systemctl is-active --quiet "$SERVICE_NAME" || die "$SERVICE_NAME is not active."
curl --silent --show-error --fail --max-time 5 "http://127.0.0.1:${CONTACT_PORT}/health" >/dev/null
ok "Contact API service is active"

# Public check is useful but deliberately non-fatal: DNS/hairpin networking can
# occasionally prevent the VPS reaching its own public hostname even when the
# site is healthy for users.
PUBLIC_CODE="$(curl --silent --output /dev/null --write-out '%{http_code}' --max-time 10 https://kineticaxisdigital.com/ || true)"
if [[ "$PUBLIC_CODE" == "200" ]]; then
  ok "https://kineticaxisdigital.com/ returned HTTP 200"
else
  warn "Public homepage check returned '${PUBLIC_CODE:-no response}'. The deploy itself completed; verify externally if needed."
fi

# Verify the performance contract from deploy/nginx-static-site.conf: gzip must
# actually compress, HTML must revalidate, and hashed build assets must be
# immutable. --resolve pins the production hostname to loopback so the check
# works on the VPS without public DNS/hairpin networking and with a valid cert.
# These are deterministic local checks, so a failure means an nginx config
# regression (for example a future rewrite dropping the gzip/cache block).
log "Verifying gzip and cache headers"
PERF_TMP="$(mktemp -d /tmp/kineticaxis.perf.XXXXXX)"
CURL_LOCAL=(curl --silent --show-error --fail --max-time 10 \
  --resolve kineticaxisdigital.com:443:127.0.0.1)

"${CURL_LOCAL[@]}" -H 'Accept-Encoding: gzip' -D "$PERF_TMP/home.headers" -o /dev/null https://kineticaxisdigital.com/ \
  || die "Local HTTPS homepage fetch failed; cannot verify performance headers."
grep -qi '^cache-control: no-cache' "$PERF_TMP/home.headers" \
  || die "Homepage is missing 'Cache-Control: no-cache' — stale HTML could be served."
grep -qi '^content-encoding: gzip' "$PERF_TMP/home.headers" \
  || die "Homepage HTML is not gzip-compressed — gzip_types regressed."

"${CURL_LOCAL[@]}" -o "$PERF_TMP/home.html" https://kineticaxisdigital.com/ \
  || die "Local homepage body fetch failed."
CHUNK_PATH="$(grep -o '/_next/static/chunks/[^"]*\.js' "$PERF_TMP/home.html" | head -n 1 || true)"
CSS_PATH="$(grep -o '/page-css/index\.css?v=[^"]*' "$PERF_TMP/home.html" | head -n 1 || true)"
[[ -n "$CHUNK_PATH" ]] || die "No hashed JS chunk found in the homepage HTML."
[[ -n "$CSS_PATH" ]] || die "No per-page stylesheet reference found in the homepage HTML."

"${CURL_LOCAL[@]}" -H 'Accept-Encoding: gzip' -D "$PERF_TMP/chunk.headers" -o /dev/null "https://kineticaxisdigital.com$CHUNK_PATH" \
  || die "Hashed chunk $CHUNK_PATH could not be fetched."
grep -qi '^cache-control: public, max-age=31536000, immutable' "$PERF_TMP/chunk.headers" \
  || die "Hashed chunk $CHUNK_PATH is not cached as immutable — _next/static cache location missing."
grep -qi '^content-encoding: gzip' "$PERF_TMP/chunk.headers" \
  || die "Hashed chunk $CHUNK_PATH is not gzip-compressed."

"${CURL_LOCAL[@]}" -D "$PERF_TMP/css.headers" -o /dev/null "https://kineticaxisdigital.com$CSS_PATH" \
  || die "Per-page stylesheet $CSS_PATH could not be fetched."
grep -qi '^cache-control: public, max-age=3600, must-revalidate' "$PERF_TMP/css.headers" \
  || die "Per-page CSS is missing its 1h must-revalidate cache header."
ok "gzip + cache headers verified (HTML no-cache & gzip, hashed chunks immutable, page CSS 1h)"
rm -rf -- "$PERF_TMP"; PERF_TMP=""

log "Submitting sitemap URLs to IndexNow"
if (cd "$PROJECT_ROOT" && node "scripts/submit-indexnow.mjs"); then
  ok "IndexNow submission accepted"
else
  warn "IndexNow submission failed. Deployment remains successful; retry later with npm run seo:indexnow."
fi

# Keep the five newest automatic backups.
if [[ -d "$BACKUP_BASE" ]]; then
  mapfile -t OLD_BACKUPS < <(find "$BACKUP_BASE" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -r | tail -n +6)
  for old in "${OLD_BACKUPS[@]:-}"; do
    [[ -n "$old" ]] && rm -rf -- "$BACKUP_BASE/$old"
  done
fi

printf '\n\033[1;32mKinetic Axis deployment complete.\033[0m\n'
printf 'Website : https://kineticaxisdigital.com\n'
printf 'Static  : %s\n' "$STATIC_ROOT"
printf 'API     : %s\n' "$API_ROOT"
printf 'Backup  : %s\n' "$BACKUP_DIR"
printf 'Analytics: %s/events.ndjson\n' "$ANALYTICS_DIR"
printf 'Leads    : %s/leads.ndjson\n' "$ANALYTICS_DIR"
printf 'Pipeline : %s\n' "$LEAD_PIPELINE_LOG_PATH"
printf 'Growth UI: https://kineticaxisdigital.com/admin/growth\n'
printf 'Lead UI  : https://kineticaxisdigital.com/admin/leads\n'
printf 'Growth auth: Nginx Basic Auth via /etc/kineticaxis/growth.htpasswd\n'
