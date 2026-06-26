# Smart Calendar — Marketing Site

Marketing and download website for [Smart Calendar](https://github.com/smart-calendar/smart-calendar). Separate from the main app repo.

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap/OG |
| `NEXT_PUBLIC_APP_URL` | Web app link on download page |
| `NEXT_PUBLIC_GITHUB_RELEASES_URL` | Windows desktop release URL |

## Download manifest

Edit `content/downloads.manifest.ts` to update platform URLs and availability without touching components.

## Deploy

Push to `main` on Vercel for automatic redeploys (~30s).

## Structure

- `app/` — routes (home, download, changelog, privacy, terms)
- `components/demo/` — product visualizations mirroring app motion
- `components/features/` — six scroll-driven feature panels
- `content/` — markdown + download manifest

See `MARKETING_WEBSITE_PROMPT.md` for the full product brief.
