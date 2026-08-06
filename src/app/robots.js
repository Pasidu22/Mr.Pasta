export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: 'https://www.mrpasta.lk/sitemap.xml',
  };
}
