# Photo Portfolio

A photography portfolio built with the same setup as my dev portfolio
(Vite + React + SCSS, react-router, animate.css letter animations, pacman loader).

## Run it

```bash
npm install
npm run dev
```

## Change the colors

Every color lives in [`src/styles/theme.css`](src/styles/theme.css).
Edit the base colors there and the whole site updates — hover tints and soft
borders are derived from them automatically.

## Add photos

Photos load straight from the rustfs bucket (S3 API), no backend.

1. Upload into the `photos` bucket, one folder per trip named `<location>-<year>`
   (e.g. `japan-2026/DSC03206.jpg`). The folder becomes the label "Japan · 2026"
   and a filter chip.
2. The bucket needs a public read-only policy (GetObject + ListBucket).
3. Settings live in `.env.local` (see [`.env.example`](.env.example)). In dev,
   `/bucket` is proxied to `RUSTFS_URL`. For Vercel, set `VITE_PHOTO_BASE_URL`
   to a public HTTPS address for rustfs.

## Structure

```
src/
  styles/theme.css        ← color palette + fonts
  index.css               ← global resets
  App.scss                ← shared buttons, panels, loader colors
  lib/photos.js           ← bucket listing + folder labels
  components/
    Layout/               ← page wrapper + fade-in
    Navbar/               ← fixed top nav (icons + socials)
    AnimatedLetters/      ← bouncing heading letters
    Home/  Gallery/  About/  Contact/
```

## Deploy

Same as the dev portfolio: import the repo in Vercel. `vercel.json` already
handles the build and client-side routes.
