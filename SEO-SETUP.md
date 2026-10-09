# Google Search setup for LunuNeth AI

Production website: https://lunu-neth-ai-website.vercel.app/

## Publish and request indexing

1. Deploy this project to the existing Vercel project using `npm run build` and output directory `dist`.
2. Check the published `/robots.txt` and `/sitemap.xml` URLs. They must return text and XML respectively, not the app HTML.
3. Open https://search.google.com/search-console and add a **URL-prefix** property for `https://lunu-neth-ai-website.vercel.app/`.
4. Verify ownership. With the HTML-file method, put the exact downloaded Google verification file in `public/`, redeploy, check its public URL, and complete verification. Keep the file in subsequent deployments.
5. In Search Console's Sitemaps section, submit `sitemap.xml`.
6. Inspect the homepage URL with URL Inspection, test the live URL, and request indexing. Check that the rendered page shows the LunuNeth AI heading and content.
7. Monitor indexing and search performance for `lununeth ai`. Google controls indexing and ranking; requests do not guarantee inclusion or first position.

Add a link to the website from the project's genuine GitHub and team profiles so visitors and crawlers can discover it. Keep the name “LunuNeth AI” consistent.

## Implementation

- `src/seo.json` is the source for the production origin and page metadata.
- `scripts/build-seo.mjs` generates route-specific HTML metadata, homepage WebSite structured data, `robots.txt`, and `sitemap.xml` after Vite builds.
- Vercel rewrites serve the matching HTML for each public route. Page content still renders through React; this is metadata generation, not full content prerendering.
- Client-side navigation updates the title, description, canonical and sharing metadata.
- `/admin` gets `noindex, nofollow` and is excluded from the sitemap. This is search metadata, not access control.
- If the domain changes, update `origin` in `src/seo.json`, update the fallback canonical in `index.html`, rebuild, and submit the new property in Search Console.

Google guidance: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
