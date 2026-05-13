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

const pairs = [
  { en: '/',                       tr: '/tr/',                       priority: '1.0', changefreq: 'weekly'  },
  { en: '/collection/',            tr: '/tr/collection/',            priority: '0.9', changefreq: 'weekly'  },
  ...luxurySlugs.map(slug => ({
    en: `/products/luxury/${slug}/`,
    tr: `/tr/products/luxury/${slug}/`,
    priority: '0.8', changefreq: 'monthly',
  })),
  ...modernSlugs.map(slug => ({
    en: `/products/modern/${slug}/`,
    tr: `/tr/products/modern/${slug}/`,
    priority: '0.8', changefreq: 'monthly',
  })),
  { en: '/privacy-policy/',        tr: '/tr/privacy-policy/',        priority: '0.3', changefreq: 'yearly'  },
  { en: '/terms-and-conditions/',  tr: '/tr/terms-and-conditions/',  priority: '0.3', changefreq: 'yearly'  },
]

function entry(loc, enLoc, trLoc, priority, changefreq) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en"        href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="tr"        href="${trLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
  </url>`
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pairs.flatMap(({ en, tr, priority, changefreq }) => [
  entry(`${SITE_URL}${en}`, `${SITE_URL}${en}`, `${SITE_URL}${tr}`, priority, changefreq),
  entry(`${SITE_URL}${tr}`, `${SITE_URL}${en}`, `${SITE_URL}${tr}`, priority, changefreq),
]).join('\n')}
</urlset>`

writeFileSync(join(ROOT, 'public', 'sitemap.xml'), xml, 'utf8')
console.log(`✓ sitemap.xml written with ${pairs.length * 2} URLs`)
