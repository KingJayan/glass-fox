#!/usr/bin/env bash
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

case "$(uname)" in
  Darwin) root="$HOME/Library/Application Support/Firefox" ;;
  *) root="$HOME/.mozilla/firefox" ;;
esac

profile="${1:-}"
if [[ -z "$profile" ]]; then
  rel="$(awk -F= '/^\[Install/{f=1} f&&/^Default=/{print $2; exit}' "$root/profiles.ini")"
  profile="$root/$rel"
fi

[[ -d "$profile" ]] || { echo "profile not found: $profile" >&2; exit 1; }

mkdir -p "$profile/chrome"
cp "$here/userChrome.css" "$profile/chrome/userChrome.css"
cp "$here/user.js" "$profile/user.js"
echo "installed to $profile — restart firefox"
