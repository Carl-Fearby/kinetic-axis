#!/usr/bin/env bash
set -Eeuo pipefail
REMOTE_HOST="${REMOTE_HOST:-pace}"
log(){ printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok(){ printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
die(){ printf '\033[1;31mERROR: %s\033[0m\n' "$*" >&2; exit 1; }
command -v ssh >/dev/null 2>&1 || die "ssh is required."
command -v openssl >/dev/null 2>&1 || die "openssl is required."
ssh -o ConnectTimeout=10 "$REMOTE_HOST" 'test "$(id -u)" = 0' || die "Could not connect to $REMOTE_HOST as root."
printf 'Username [admin]: '
IFS= read -r user || true
user="${user:-admin}"
[[ "$user" =~ ^[A-Za-z0-9._-]+$ ]] || die "Username may contain only letters, numbers, dot, underscore and hyphen."
printf 'Password: '
IFS= read -r -s password || true
printf '\n'
[[ -n "$password" ]] || die "Password cannot be empty."
printf 'Confirm password: '
IFS= read -r -s confirm || true
printf '\n'
[[ "$password" == "$confirm" ]] || die "Passwords do not match."
log "Updating growth dashboard credentials"
hash="$(printf '%s\n' "$password" | openssl passwd -apr1 -stdin)"
printf '%s:%s\n' "$user" "$hash" | ssh "$REMOTE_HOST" 'install -d -m 0750 -o root -g www-data /etc/kineticaxis && cat > /etc/kineticaxis/growth.htpasswd && chown root:www-data /etc/kineticaxis/growth.htpasswd && chmod 0640 /etc/kineticaxis/growth.htpasswd'
unset password confirm hash
ok "Growth and lead-management admin username/password updated on $REMOTE_HOST"
