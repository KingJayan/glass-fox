## `glass fox`

simple dark glass UI for Firefox.

- `skin/` - `userChrome.css` for the browser chrome (tabs, toolbar, urlbar, menus, panels).
- `extension/` - TS WebExtension dark theme via the theme API and custom new tab page.

### skin

```sh
./skin/install.sh                # default profile
./skin/install.sh /path/to/profile
```

restart Firefox to apply changes.

>[!NOTE]
> `user.js` turns on `userChrome.css` loading and vertical tabs. If you already have a `user.js`, merge it by hand because the script overwrites it.

### local extension

```sh
cd extension
npm i
npm run build      # dist/
npm test
npm run lint
npm start          # temporary install in a clean firefox profile
npm run package    # artifacts/*.zip
```

for daily use without signing: `about:debugging` → This Firefox → Load Temporary Add-on → `extension/dist/manifest.json` (lost on restart). For a permanent install, sign it as unlisted on addons.mozilla.org, or use Firefox Developer Edition with `xpinstall.signatures.required = false`. Currently is signed and stock glass is available in [Releases](https://github.com/KingJayan/glass-fox/releases)

### new tab keys

| key | action |
| --- | --- |
| `/` | focus search |
| `1`–`8` | open top site |
| `esc` | clear search |

### tokens

| token | value |
| --- | --- |
| background | `#09090B` |
| surface | `#171719` |
| elevated | `#222225` |
| border | `#343438` |
| text | `#F5F5F7` |
| text 2 | `#98989F` |
| accent | `#8AB4F8` |
