#!/usr/bin/env bash
set -Eeuo pipefail
REMOTE_HOST="${REMOTE_HOST:-pace}"
DAYS="${1:-30}"
[[ "$DAYS" =~ ^[0-9]+$ ]] || { echo "Usage: ./analytics.sh [days]" >&2; exit 1; }
ssh "$REMOTE_HOST" "node /opt/kineticaxis-contact/analytics-report.mjs '$DAYS'"
