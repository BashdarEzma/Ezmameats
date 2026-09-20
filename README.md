# Ezmameats — Static Site (Next.js + TypeScript)

A fully static rebuild of the Ezmameats WordPress site. No PHP, no MySQL, no server runtime required — just static HTML/CSS/JS files that any host can serve (Bluehost, Netlify, Vercel, GitHub Pages, S3, etc).

## What this is

All content (products, brands, categories, pages) was exported from the live WordPress install into `src/data/site-export.json`, and every page is pre-rendered at build time into plain HTML in the `out/` folder. There is no database and no runtime dependency on WordPress — this is a snapshot, not a live sync.

## Structure
- `src/data/site-export.json` — all site content (34 products, 2 brands, 7 categories, 5 pages)
- `src/lib/data.ts` — typed accessors over that data
- `src/components/` — Header, Footer, ProductCard
- `src/app/` — one folder per route (Next.js App Router), each a server component that reads from `lib/data.ts`
- `public/wp-content/uploads/` — all product photos, logo, and hero banner (copied as-is from WordPress)

## Local development
```
npm install
npm run dev       # http://localhost:3000, live-reloading
```

## Build the static site
```
npm run build      # outputs static HTML/CSS/JS into ./out
```
The `out/` folder is the entire deployable site. Upload its contents to any static host's document root — no Node.js server needs to run in production.

## Deploying to Bluehost (or similar shared hosting)
1. Run `npm run build`.
2. Upload the **contents** of `out/` (not the folder itself) to `public_html/` (or your domain's document root) via File Manager or FTP.
3. That's it — no database, no wp-config, no PHP needed. `.htaccess`/redirects aren't required since every route already has its own folder with an `index.html`.

## Updating content
This is a snapshot of the WordPress site at the time of export — it will **not** automatically reflect future edits made in WordPress. To refresh it:
1. Re-run the WP-CLI export script (`export_site.php`) against the WordPress install to regenerate the JSON.
2. Replace `src/data/site-export.json` with the fresh export.
3. Re-copy any new/changed media into `public/wp-content/uploads/`.
4. Run `npm run build` again.

Alternatively, once happy with this static version, you can edit `src/data/site-export.json` directly (it's just JSON) for small text tweaks — no WordPress required at all going forward.

## Contact form note
Since this is a static site with no backend, the contact form uses a `mailto:` submission (opens the visitor's email client with the message pre-filled) rather than server-side form processing. If you want a proper JS-handled form later, swap in a service like Formspree or Netlify Forms.

## Security note
`package.json` pins Next.js 14.2.35 (latest patched 14.x). `npm audit` will still flag some advisories — all of them concern Next.js's *server* runtime (Image Optimizer, Middleware, Server Actions), none of which exist in this build: `output: 'export'` produces plain static files with no Node.js server running in production. Just don't run `next start` on this project in production; only ever serve the `out/` folder as static files.
