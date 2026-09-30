#!/usr/bin/env bash
# Deploy the website to SiteGround over SSH.
#
# Usage:  ./deploy-siteground.sh <ssh-user> <ssh-host>
#   e.g.  ./deploy-siteground.sh u123-abcdef ssh.focuseyesecurity.co.nz
#
# Needs the deploy key (~/.ssh/focuseye_siteground) imported in SiteGround:
# Site Tools > Devs > SSH Keys Manager > Import.
# The server's public_html is backed up to ~/backups/ before each upload.
set -euo pipefail

USER_NAME="${1:?ssh user required}"
HOST="${2:?ssh host required}"
PORT=18765
KEY="$HOME/.ssh/focuseye_siteground"
REMOTE_ROOT="www/focuseyesecurity.co.nz/public_html"

cd "$(dirname "$0")"

# Website files only (no git, Azure config, scripts or backups)
FILES=(*.html .htaccess robots.txt sitemap.xml favicon.ico favicon.svg apple-touch-icon.png assets css js)

SSH=(ssh -i "$KEY" -p "$PORT" -o StrictHostKeyChecking=accept-new "$USER_NAME@$HOST")

echo "Backing up current public_html on the server..."
"${SSH[@]}" "mkdir -p ~/backups && tar czf ~/backups/public_html-\$(date +%Y%m%d-%H%M%S).tgz -C \$(dirname $REMOTE_ROOT) public_html"

echo "Uploading site..."
tar czf - "${FILES[@]}" | "${SSH[@]}" "mkdir -p $REMOTE_ROOT && tar xzf - -C $REMOTE_ROOT"

echo "Done. Files on server:"
"${SSH[@]}" "ls -la $REMOTE_ROOT"
