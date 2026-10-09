import { readFileSync, writeFileSync } from 'node:fs';

const { origin, pages } = JSON.parse(readFileSync(new URL('../src/seo.json', import.meta.url), 'utf8'));
const output = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', output), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const [key, page] of Object.entries(pages)) {
  const url = origin + page.path;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: 'LunuNeth AI',
    alternateName: ['LunuNeth', 'Lunu Neth AI'],
    url: `${origin}/`,
    inLanguage: 'en',
  };
  const head = `
    <title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <meta name="robots" content="${key === 'admin' ? 'noindex, nofollow' : 'index, follow'}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="LunuNeth AI" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/logo.jpeg" />
    <meta property="og:image:alt" content="LunuNeth AI logo" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${origin}/logo.jpeg" />
    ${key === 'home' ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
  `;
  if (!template.includes('<!-- SEO:start -->') || !template.includes('<!-- SEO:end -->')) {
    throw new Error('Missing SEO template markers');
  }
  writeFileSync(new URL(key === 'home' ? 'index.html' : `${key}.html`, output),
    template.replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/, `<!-- SEO:start -->${head}<!-- SEO:end -->`));
}

const urls = Object.entries(pages).filter(([key]) => key !== 'admin').map(([, page]) =>
  `  <url><loc>${origin}${page.path}</loc></url>`).join('\n');
writeFileSync(new URL('sitemap.xml', output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(new URL('robots.txt', output), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
