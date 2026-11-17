#!/usr/bin/env bash
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

case "$(uname)" in
  Darwin) root="$HOME/Library/Application Support/Firefox" ;;
  *) root="$HOME/.mozilla/firefox" ;;
esac

profile="${1:-}"
if [[ -z "$profile" ]]; then
  prefs="$(ls -t "$root"/Profiles/*/prefs.js "$root"/*/prefs.js 2>/dev/null | head -1 || true)"
  [[ -n "$prefs" ]] || { echo "no firefox profile found in $root" >&2; exit 1; }
  profile="$(dirname "$prefs")"
fi

[[ -d "$profile" ]] || { echo "profile not found: $profile" >&2; exit 1; }

if pgrep -xi firefox >/dev/null; then
  echo "quit firefox first (cmd+q), then run again" >&2
  exit 1
fi

mkdir -p "$profile/chrome"
cp "$here/userChrome.css" "$profile/chrome/userChrome.css"
cp "$here/user.js" "$profile/user.js"
echo "installed to $profile — restart firefox"
