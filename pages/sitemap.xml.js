// pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.gravixelattires.shop';

  // Fetch products from backend API
  let products = [];
  try {
    const productsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
    if (productsRes.ok) {
      products = await productsRes.json();
    }
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }

  // Fetch categories from backend (adjusted to use backend directly, not frontend route)
  let categories = [];
  try {
    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
    if (categoriesRes.ok) {
      categories = await categoriesRes.json();
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  // Static pages
  const staticPages = ['/', '/about', '/contact', '/shop'];

  // Build full list of URLs
  const urls = [
    ...staticPages.map((path) => `${baseUrl}${path}`),
    ...products.map((p) => `${baseUrl}/product/${p.slug}`),
    ...categories.map((c) => `${baseUrl}/category/${c.slug}`),
  ];

  // Build XML string
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Send response
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null; // No UI
}
