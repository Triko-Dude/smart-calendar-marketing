# Chronocal — Marketing Site

Marketing and download website for [Chronocal](https://github.com/Triko-Dude/smart-calendar). Separate from the main app repo.

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) (or port 3000 if not specified).

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap/OG (default `https://chronocal.tech`) |
| `NEXT_PUBLIC_APP_URL` | Hosted web app URL for marketing CTAs (default `https://app.chronocal.tech`) |
| `NEXT_PUBLIC_WINDOWS_INSTALLER_URL` | Windows desktop installer URL (GitHub Releases) |
| `NEXT_PUBLIC_WINDOWS_INSTALLER_SHA256` | SHA-256 of the Windows installer |

## Download manifest

Edit `content/downloads.manifest.ts` to update platform URLs and availability without touching components.

## Deploy

Push to `master` on Vercel for automatic redeploys (~30s). Custom domain: `chronocal.tech`.

## Structure

- `app/` — routes (home, download, changelog, privacy, terms)
- `components/demo/` — product visualizations mirroring app motion
- `components/features/` — six scroll-driven feature panels
- `content/` — markdown + download manifest
- `lib/brand.ts` — product name, taglines, and contact constants

See `MARKETING_WEBSITE_PROMPT.md` for the full product brief.
