# Duck War สงคราม เป็ด เป็ด

A Clash-style base-building game with an army of ducks against cat bases.

- `src/` holds the game code (bundled into `web/game.js`). `web/` holds the page and art.
- `tools/build_assets.py` packs the Blender renders into `web/assets` and `web/data/art.json`.
- `tests/run.cjs` runs headless engine tests.
- Every push to `main` runs the tests and publishes a content patch plus a browser build to GitHub Pages (`/play/`).
- A commit message containing `[apk]` also builds an Android test APK into Releases.
