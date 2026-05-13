import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE_URL = 'https://www.pouffurnitures.com'

const luxurySlugs = [
  'lagos', 'bentley', 'venesia', 'gucci', 'roma', 'paris',
  'valencia', 'angel-pro', 'angel-dining', 'angel-pro-dining',
  'lagos-dining', 'valencia-dining',
]

const modernSlugs = [
  'asya', 'asya-corner-set', 'maveron', 'alfeca', 'ares',
  'magnum', 'akron', 'alfa', 'mitra', 'vega',
]

const today = new Date().toISOString().split('T')[0]

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_URL}/collection/`, priority: '0.9', changefreq: 'weekly' },
  ...luxurySlugs.map(slug => ({
    loc: `${SITE_URL}/products/luxury/${slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...modernSlugs.map(slug => ({
    loc: `${SITE_URL}/products/modern/${slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { loc: `${SITE_URL}/privacy-policy/`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${SITE_URL}/terms-and-conditions/`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${SITE_URL}/tr/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_URL}/tr/collection/`, priority: '0.9', changefreq: 'weekly' },
  ...luxurySlugs.map(slug => ({
    loc: `${SITE_URL}/tr/products/luxury/${slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...modernSlugs.map(slug => ({
    loc: `${SITE_URL}/tr/products/modern/${slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { loc: `${SITE_URL}/tr/privacy-policy/`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${SITE_URL}/tr/terms-and-conditions/`, priority: '0.3', changefreq: 'yearly' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml, 'utf8')
console.log(`✓ sitemap.xml written with ${urls.length} URLs`)
