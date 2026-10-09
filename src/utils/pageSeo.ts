import seo from '../seo.json';

export function updatePageSeo(page: keyof typeof seo.pages) {
  const metadata = seo.pages[page];
  document.title = metadata.title;
  const values: Record<string, string> = {
    'meta[name="description"]': metadata.description,
    'meta[name="robots"]': page === 'admin' ? 'noindex, nofollow' : 'index, follow',
    'meta[property="og:title"]': metadata.title,
    'meta[property="og:description"]': metadata.description,
    'meta[property="og:url"]': seo.origin + metadata.path,
    'meta[name="twitter:title"]': metadata.title,
    'meta[name="twitter:description"]': metadata.description,
  };
  for (const [selector, value] of Object.entries(values)) {
    document.querySelector(selector)?.setAttribute('content', value);
  }
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', seo.origin + metadata.path);
}
