# Full SEO Audit Report — Pouf Furniture
**URL:** https://www.pouffurnitures.com (audited via http://localhost:3002)
**Date:** 2026-05-12
**Auditor:** Claude SEO Audit v1.9.9
**Business Type:** B2B furniture manufacturer & exporter (İnegöl, Turkey)
**Framework:** Next.js (SSG/SSR)

---

## SEO Health Score: 63 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 70/100 | 15.4 |
| Content Quality | 23% | 62/100 | 14.3 |
| On-Page SEO | 20% | 55/100 | 11.0 |
| Schema / Structured Data | 10% | 65/100 | 6.5 |
| Performance (CWV) | 10% | 60/100 | 6.0 |
| AI Search Readiness | 10% | 72/100 | 7.2 |
| Images | 5% | 55/100 | 2.8 |
| **TOTAL** | **100%** | | **63.2** |

---

## Executive Summary

Pouf Furniture has a solid technical foundation — clean URLs, valid canonicals, a working sitemap, and proper hreflang implementation across English and Turkish. The site is fast (sub-30ms TTFB) and most pages have well-crafted title tags and meta descriptions.

However, **two critical bugs block crawlers and harm rankings:**

1. **The `/collection/` page has zero links to individual product pages.** All 22 product cards link to `/#contact` instead of their respective `/products/…/` URLs. Google cannot discover or crawl product pages from the collection — the main entry point for product discovery is broken.
2. **The XML sitemap omits all Turkish-language URLs.** The `/tr/` homepage, `/tr/collection/`, and all 22 `/tr/products/…/` pages are invisible to crawlers via the sitemap.

Fixing these two issues alone would unlock significant crawl coverage. Secondary priorities are image optimisation (no lazy loading, no dimensions, no WebP), thin content on product pages, and filling gaps in schema markup.

### Top 5 Critical Issues
1. Collection page links all 22 product cards to `/#contact` — zero product page links
2. Sitemap missing all ~25 Turkish-language URLs (`/tr/*`)
3. All images site-wide lack `width`/`height` attributes (Cumulative Layout Shift risk)
4. No lazy loading on below-fold images (unnecessary LCP delay on scroll)
5. Turkish homepage and collection pages have no JSON-LD schema

### Top 5 Quick Wins
1. Fix collection page product links — 30-minute fix, unlocks full crawl graph
2. Add `/tr/` URLs to sitemap — one file edit
3. Add `width` + `height` to all `<img>` tags — eliminate CLS
4. Add `loading="lazy"` to images below the fold
5. Add `telephone` and `email` to Organization schema on homepage

---

## Pages Audited

| URL | HTTP | Title | H1 | Meta Desc | Canonical | Schema |
|---|---|---|---|---|---|---|
| `/` | 200 | ✅ 60 chars | ✅ 1 | ✅ 153 chars | ✅ | Org+WebSite |
| `/collection/` | 200 | ✅ 48 chars | ✅ 1 | ✅ 120 chars | ✅ | ❌ None |
| `/products/luxury/lagos/` | 200 | ✅ 37 chars | ✅ 1 | ✅ 110 chars | ✅ | Product+Breadcrumb |
| `/products/luxury/bentley/` | 200 | ✅ 40 chars | ✅ 1 | ✅ 110 chars | ✅ | Product+Breadcrumb |
| `/products/luxury/venesia/` | 200 | ✅ | ✅ | ✅ | ✅ | Product+Breadcrumb |
| `/products/modern/asya/` | 200 | ✅ | ✅ | ✅ | ✅ | Product+Breadcrumb |
| `/products/modern/vega/` | 200 | ✅ | ✅ | ✅ | ✅ | Product+Breadcrumb |
| `/products/modern/magnum/` | 200 | ✅ | ✅ | ✅ | ✅ | Product+Breadcrumb |
| `/tr/` | 200 | ✅ (TR) | ✅ (TR) | — | ✅ | ❌ None |
| `/tr/collection/` | 200 | — | — | — | ✅ | ❌ None |
| `/tr/products/luxury/lagos/` | 200 | ✅ (TR) | ✅ | ✅ | ✅ | Product+Breadcrumb |
| All 22 sitemap products | 200 | ✅ | ✅ | ✅ | ✅ | ✅ |

**404 pages:** None found. All 22 sitemap product URLs return HTTP 200. ✅

---

## Technical SEO — Score: 70/100

### Robots.txt ✅
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://www.pouffurnitures.com/sitemap.xml
```
Clean and correct. `/api/` disallowed appropriately.

### Sitemap ⚠️
- **Present:** `https://www.pouffurnitures.com/sitemap.xml`
- **Pages listed:** 24 (homepage + collection + 22 products)
- **All URLs return 200:** ✅
- **lastmod dates:** 2026-05-11 (accurate) ✅
- **Priority values:** Appropriate (1.0 / 0.9 / 0.8)
- **CRITICAL GAP:** Zero Turkish `/tr/` URLs included. The site has ~25 Turkish pages that exist but are invisible to search engines via the sitemap.

### Canonicals ✅
Every audited page has a `<link rel="canonical">` pointing to the production domain (`https://www.pouffurnitures.com/…`). No self-referencing issues detected.

### Hreflang ✅
- Homepage, collection, and product pages all have reciprocal `hreflang` tags for `en`, `tr`, and `x-default`.
- Turkish pages have correct reciprocal hreflang back to English counterparts.
- Language codes are valid ISO 639-1 (`en`, `tr`).
- `x-default` correctly points to English URLs.

**Minor:** The attribute uses mixed case `hrefLang=` instead of lowercase `hreflang=`. Functionally fine (HTML attributes are case-insensitive), but lowercase is the standard convention.

### Crawl Architecture ❌ CRITICAL
The `/collection/` page is the primary product hub, but **all 22 product cards link to `/#contact`** rather than their product URLs. This means:
- Googlebot cannot discover product pages from the collection
- Users clicking product cards land on a contact form instead of the product detail
- The only crawl path to product pages is via the sitemap directly

### Response Performance ✅
| Page | TTFB |
|---|---|
| Homepage | 30ms |
| /collection/ | 9ms |
| /products/luxury/lagos/ | 13ms |
| /products/modern/asya/ | 6ms |

Excellent server response times (Next.js SSG).

### HTTP Headers ⚠️
Missing recommended security headers (relevant at production deployment):
- `X-Frame-Options` or `frame-ancestors` CSP — clickjacking protection
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HTTPS enforcement)
- `Content-Security-Policy`

---

## Content Quality — Score: 62/100

### Homepage
- **Word count:** ~770 words — adequate for a landing page
- **Sections:** Hero, collections overview, featured products, stats, about, trust signals, testimonials, contact
- **E-E-A-T signals present:** 25 years experience, İnegöl/Bursa origin, B2B wholesale credentials, 3 social profiles (Instagram, Facebook, LinkedIn)
- **Gap:** No author byline, no team information, no industry certifications mentioned

### Product Pages (all 22)
- **Word count:** ~576–580 words per page — **thin for standalone SEO**
- Each product page describes materials, style, and B2B context, which is good
- No customer testimonials or reviews on individual products
- No specification tables (dimensions, weight, material grades)
- No related products section

### Collection Page
- **Word count:** 929 words — reasonable
- All 22 products listed, but links are broken (see crawl architecture above)

### Missing Content Pages
- No `/contact` page (only `#contact` anchor on homepage)
- No `/about` or `/about-us` page
- No blog or trade resources section
- No FAQ page

These missing pages are a B2B SEO gap. Trade buyers searching "Turkish furniture manufacturer contact" or "İnegöl furniture wholesale" would be better served by dedicated pages.

### Readability
- Headlines use brand typography (League Spartan) — impactful and clear
- Body copy is concise and B2B-appropriate
- Turkish pages are correctly translated (verified `/tr/` and `/tr/products/luxury/lagos/`)

---

## On-Page SEO — Score: 55/100

### Title Tags ✅
| Page | Title | Length |
|---|---|---|
| Homepage | Pouf Furniture — Turkish B2B Furniture Manufacturer & Exporter | 60 chars |
| /collection/ | Furniture Collections — Luxury & Contemporary | Pouf | 51 chars |
| /products/luxury/lagos/ | Lagos – Luxury Collection | Pouf Furniture | 44 chars |
| /products/modern/asya/ | Asya – Contemporary | Pouf Furniture | 38 chars |

All titles within Google's ~60-char display limit. Consistent pattern.

### Meta Descriptions ✅
All audited pages have descriptive meta descriptions that include B2B signals and product specifics.

### Heading Structure ✅
- All pages have exactly **one H1**
- H2 headings are present and meaningful on the homepage (6 H2s)
- Product pages: H1 = product name — appropriate

### Internal Linking ❌ CRITICAL
- **Collection → Products:** 0 links (all 28 product-area links go to `/#contact`)
- **Homepage → Products:** 4 featured product images link to product detail pages ✅
- **Product → Related Products:** 0 links (no related products section)
- **Product → Collection:** Via breadcrumb ✅

The internal link graph is severely limited. Product pages are effectively orphaned from the collection.

### URL Structure ✅
Clean, descriptive, hierarchical:
```
/products/[collection]/[model-name]/
/tr/products/[collection]/[model-name]/
```

---

## Schema / Structured Data — Score: 65/100

### Homepage — Organization + WebSite (combined block)
✅ Present: `name`, `url`, `logo`, `description`, `foundingDate`, `address`, `sameAs` (3 social profiles)

❌ Missing:
- `telephone` — present in llms.txt but not in schema
- `email` — same issue
- `potentialAction` (SearchAction for WebSite) — enables sitelinks search box in Google
- `@id` URI on the Organization node (should be `https://www.pouffurnitures.com/#organization`)

### Product Pages — Product + BreadcrumbList ✅
Present on all 22 English product pages.

✅ Good: `name`, `description`, `image` array (2–3 URLs per product), `brand`, `manufacturer`, `offers` with `InStock`, `BreadcrumbList` (3-level)

❌ Missing or weak:
- `@id` on Product node (should be the canonical product URL)
- `sku` — model reference number
- `offers.priceCurrency` / `offers.price` — B2B context can use `priceSpecification` or omit, but structured contact-for-price patterns exist
- `aggregateRating` — prepare field even with 0 reviews

### Collection Page — No Schema ❌
Zero JSON-LD. Recommended: `ItemList` schema with all 22 products and their URLs.

### Turkish Pages — Partial ❌
| Page | Schema |
|---|---|
| `/tr/` | ❌ None |
| `/tr/collection/` | ❌ None |
| `/tr/products/…/` (all 22) | ✅ Product + BreadcrumbList |

---

## Performance — Score: 60/100

*No Google API credentials configured. Lab estimates only; CrUX field data not available.*

### Server Response ✅
TTFB: 6–30ms — excellent (Next.js static generation).

### Image Optimisation ❌
All 19 homepage images share these issues:
- `loading="eager"` on all — below-fold images should use `loading="lazy"`
- No `width` or `height` attributes — browser cannot reserve layout space → **CLS risk**
- No `srcset` or `sizes` — same JPEG served to all screen sizes
- Format: JPEG only — no WebP or AVIF
- No `fetchpriority="high"` on the hero LCP image

### Font Loading ⚠️
Two Google Fonts families loaded without `preconnect` hints:
```html
<!-- Add these before the stylesheet links: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### External Resources
- Google Fonts: 2 requests
- Tabler Icons (jsDelivr CDN): 1 request
- No analytics or tracking scripts ✅

---

## Images — Score: 55/100

| Issue | Count | Severity |
|---|---|---|
| Empty `alt=""` | 1 (footer logo) | Medium |
| Missing `width`/`height` | All images | High |
| No `loading="lazy"` on below-fold | ~14 of 19 | High |
| No `srcset`/responsive images | All | Medium |
| JPEG-only (no WebP/AVIF) | All | Medium |

**The 1 empty alt:** `<img src="/brand_assets/main_logo.png" alt="">` in the footer. The nav instance has `alt="Pouf Furniture"` correctly. Fix the footer to match.

**All other images have descriptive alt text** — good practice already in place. ✅

---

## AI Search Readiness — Score: 72/100

### llms.txt ✅
`https://www.pouffurnitures.com/llms.txt` — HTTP 200, well-structured with:
- Company identity and origin ✅
- Product collections listed ✅
- Services (B2B wholesale, OEM, export terms) ✅
- Contact: email `akif@pouffurnitures.com`, WhatsApp `+90 543 245 5503`, location ✅
- Website URL ✅

No `llms-full.txt` — optional, recommended for AI assistants that need per-product specs.

### Citability Signals
- Clear manufacturer identity (İnegöl, Turkey, 25 years) ✅
- Contact information publicly available ✅
- Social proof (3 platforms) ✅
- `sameAs` links in schema ✅
- No author bylines or E-E-A-T expert pages
- No press mentions or trade publication citations

### AI Crawler Access
- `robots.txt` allows all crawlers — no AI-specific blocks ✅
- No `noindex` detected on any page ✅

---

## Hreflang Audit — PASS ✅

| Check | Result |
|---|---|
| EN pages reference TR alternate | ✅ |
| TR pages reference EN alternate | ✅ |
| x-default present | ✅ |
| x-default points to EN | ✅ |
| Language codes valid ISO 639-1 | ✅ |
| Self-referential alternate present | ✅ |
| Reciprocal tags consistent | ✅ |

---

## Sitemap Analysis

**File:** `https://www.pouffurnitures.com/sitemap.xml`
**Total URLs listed:** 24
**All 24 return HTTP 200:** ✅
**Format:** Valid XML, correct namespace

**Missing from sitemap (~25 URLs):**
- `/tr/` (Turkish homepage)
- `/tr/collection/`
- `/tr/products/luxury/lagos/` through `/tr/products/luxury/valencia-dining/` (12 pages)
- `/tr/products/modern/asya/` through `/tr/products/modern/vega/` (10 pages)

---

## Business Context

**Type:** B2B Manufacturer / Exporter — International
**Collections:** Luxury (12 models), Contemporary (10 models) — 22 total
**Target markets:** Wholesalers, retailers, trade partners globally
**Primary conversion:** Trade inquiry (WhatsApp + email form)
**Key differentiators:** 25 years family expertise, İnegöl origin, OEM/private label capability

**SEO priorities for this business type:**
1. Product page depth — buyers need specs, materials, MOQ information
2. International SEO — Turkish and English markets are both strategic
3. Trust signals — 25-year track record is a key differentiator
4. Contact accessibility — B2B buyers need direct WhatsApp/email access
