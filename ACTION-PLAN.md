# SEO Action Plan — Pouf Furniture
**Generated:** 2026-05-12
**Overall Score:** 63/100
**Target Score:** 80+/100

---

## CRITICAL — Fix Immediately

### 1. Fix collection page product links
**Impact:** Crawlability, internal linking, user experience
**Effort:** 30 minutes

All 22 product cards currently link to `/#contact` instead of their product detail pages. Every card-level link should route to `/products/[collection]/[model]/`.

**Before:**
```html
<a href="/#contact">Bentley</a>
```
**After:**
```html
<a href="/products/luxury/bentley/">Bentley</a>
```

Verify: re-audit `/collection/` and confirm `href="/products/…"` links appear in source.

---

### 2. Add Turkish URLs to sitemap
**Impact:** Crawl coverage for ~25 TR pages, Google indexing of Turkish content
**Effort:** 15 minutes

Add all `/tr/` alternates to `sitemap.xml`. Each entry should include `<xhtml:link>` alternate blocks, and the `<urlset>` needs `xmlns:xhtml="http://www.w3.org/1999/xhtml"`:

```xml
<url>
  <loc>https://www.pouffurnitures.com/tr/</loc>
  <lastmod>2026-05-12</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.pouffurnitures.com/"/>
  <xhtml:link rel="alternate" hreflang="tr" href="https://www.pouffurnitures.com/tr/"/>
</url>
```

---

## HIGH — Fix Within 1 Week

### 3. Add width and height to all images
**Impact:** Eliminates Cumulative Layout Shift (CLS)
**Effort:** 1–2 hours

Every `<img>` tag is missing `width` and `height`. Use actual pixel dimensions of source files. If using Next.js `<Image>` component, this is handled automatically.

```html
<img src="/images/luxury/bentley/pouf-luxury-bentley-01.jpg" alt="Pouf Bentley" width="800" height="600">
```

---

### 4. Add lazy loading to below-fold images
**Impact:** LCP improvement, faster above-fold render
**Effort:** 30 minutes

Keep the hero image `eager` (or add `fetchpriority="high"`). All other images:

```html
<img src="/images/luxury/lagos/…" alt="…" loading="lazy" width="800" height="600">
```

---

### 5. Fix empty alt on footer logo
**Impact:** Accessibility, image SEO
**Effort:** 5 minutes

Footer logo has `alt=""`. Change to:
```html
<img src="/brand_assets/main_logo.png" alt="Pouf Furniture">
```

---

### 6. Add ItemList schema to collection page
**Impact:** Schema coverage, potential rich results
**Effort:** 1 hour

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Pouf Furniture Collections",
  "url": "https://www.pouffurnitures.com/collection/",
  "numberOfItems": 22,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Lagos", "url": "https://www.pouffurnitures.com/products/luxury/lagos/" },
    { "@type": "ListItem", "position": 2, "name": "Bentley", "url": "https://www.pouffurnitures.com/products/luxury/bentley/" }
    // … all 22 products
  ]
}
```

---

### 7. Add schema to Turkish homepage and collection
**Impact:** Schema parity across languages
**Effort:** 30 minutes

Copy the Organization+WebSite schema from the English homepage to `/tr/`. Update `url` and description to TR canonical. Copy ItemList schema to `/tr/collection/` with TR product URLs.

---

### 8. Add telephone and email to Organization schema
**Impact:** Knowledge Panel accuracy, E-E-A-T
**Effort:** 15 minutes

Add to homepage Organization schema:
```json
{
  "telephone": "+90 543 245 5503",
  "email": "akif@pouffurnitures.com"
}
```

---

## MEDIUM — Fix Within 1 Month

### 9. Add WebSite SearchAction schema
**Impact:** Enables Google sitelinks search box
**Effort:** 15 minutes (only if collection page has working search)

```json
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://www.pouffurnitures.com/collection/?search={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 10. Add @id and sku to Product schema
**Impact:** Linked data entity resolution, schema completeness
**Effort:** 30 minutes

```json
{
  "@type": "Product",
  "@id": "https://www.pouffurnitures.com/products/luxury/lagos/",
  "sku": "LUX-LAGOS-001",
  "name": "Lagos"
}
```

---

### 11. Add Google Fonts preconnect hints
**Impact:** ~100–200ms faster font load
**Effort:** 5 minutes

Add before the Google Fonts `<link>` tags:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

### 12. Convert images to WebP and add srcset
**Impact:** 25–40% smaller images, faster LCP, better mobile performance
**Effort:** 2–4 hours

```html
<picture>
  <source srcset="/images/luxury/lagos/pouf-luxury-lagos-01.webp" type="image/webp">
  <img src="/images/luxury/lagos/pouf-luxury-lagos-01.jpg" alt="Pouf Lagos luxury sofa" width="800" height="600" loading="lazy">
</picture>
```

If using Next.js `<Image>`, WebP conversion and srcset are automatic.

---

### 13. Add HTTP security headers
**Impact:** Security, browser trust
**Effort:** 30 minutes

In `next.config.js`:
```js
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ],
}],
```

---

## LOW — Backlog

### 14. Add llms-full.txt
Create `/public/llms-full.txt` with detailed per-product specs (dimensions, fabrics, MOQ, lead time) for AI assistant coverage.

### 15. Create dedicated /contact page
Move `#contact` content to `pages/contact.js`. Add to sitemap. Enables trade buyers to find a direct contact page in search.

### 16. Create dedicated /about page
Expand `#about` section into `/about/` with founding story, factory location, team profiles, and export certifications. Strengthens E-E-A-T.

### 17. Add related products to product pages
Link each product to 3–4 related models. Builds internal link equity and helps crawl traversal.

### 18. Add product specification tables
Add dimensions, fabric options, frame material, MOQ, and lead time tables to product pages. Addresses thin content (~576 words) and directly serves B2B buyer needs.

---

## Priority Summary

| # | Issue | Priority | Effort | Impact |
|---|---|---|---|---|
| 1 | Fix collection → product links | Critical | 30 min | Crawl + UX |
| 2 | Add TR URLs to sitemap | Critical | 15 min | TR indexing |
| 3 | Add width/height to images | High | 1–2h | CLS / CWV |
| 4 | Add lazy loading | High | 30 min | Performance |
| 5 | Fix empty alt on footer logo | High | 5 min | A11y |
| 6 | ItemList schema on collection | High | 1h | Schema |
| 7 | Schema on /tr/ pages | High | 30 min | Schema |
| 8 | Phone/email in Org schema | High | 15 min | Knowledge Panel |
| 9 | SearchAction schema | Medium | 15 min | Sitelinks |
| 10 | @id + sku on Product schema | Medium | 30 min | Linked data |
| 11 | Google Fonts preconnect | Medium | 5 min | Performance |
| 12 | WebP + srcset images | Medium | 2–4h | Performance |
| 13 | HTTP security headers | Medium | 30 min | Security |
| 14 | llms-full.txt | Low | 2h | AI search |
| 15 | Dedicated /contact page | Low | 2–3h | Content |
| 16 | Dedicated /about page | Low | 2–3h | E-E-A-T |
| 17 | Related products | Low | 2–3h | Internal links |
| 18 | Product specification tables | Low | 3–4h | Content depth |
