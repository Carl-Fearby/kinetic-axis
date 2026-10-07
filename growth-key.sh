#!/usr/bin/env bash
set -Eeuo pipefail
REMOTE_HOST="${REMOTE_HOST:-pace}"
ssh "$REMOTE_HOST" "sudo grep '^GROWTH_DASHBOARD_TOKEN=' /etc/kineticaxis/contact.env | cut -d= -f2-"
