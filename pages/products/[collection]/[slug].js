import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import { allProducts, luxuryProducts, modernProducts, getProduct, imgUrl, SITE_URL } from '../../../data/products'

export default function ProductPage({ product, collection, relatedProducts }) {
  const [activeImg, setActiveImg] = useState(0)
  const [switching, setSwitching] = useState(false)
  const [lbOpen, setLbOpen] = useState(false)
  const touchStartX = useRef(null)
  const lbTouchX = useRef(null)

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta < 0) goImg((activeImg + 1) % product.imageCount)
    else goImg((activeImg - 1 + product.imageCount) % product.imageCount)
  }

  function lbTouchStart(e) { lbTouchX.current = e.touches[0].clientX }
  function lbTouchEnd(e) {
    if (lbTouchX.current === null) return
    const delta = e.changedTouches[0].clientX - lbTouchX.current
    lbTouchX.current = null
    if (Math.abs(delta) < 40) return
    goImg(delta < 0 ? (activeImg + 1) % product.imageCount : (activeImg - 1 + product.imageCount) % product.imageCount)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goImg((activeImg + 1) % product.imageCount)
      else if (e.key === 'ArrowLeft') goImg((activeImg - 1 + product.imageCount) % product.imageCount)
      else if (e.key === 'Escape') setLbOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeImg, product.imageCount])

  useEffect(() => {
    document.body.style.overflow = lbOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lbOpen])

  function goImg(idx) {
    setSwitching(true)
    setTimeout(() => { setActiveImg(idx); setSwitching(false) }, 180)
  }

  const collectionLabel = collection === 'luxury' ? 'Luxury Collection' : 'Contemporary'
  const pageTitle = `${product.name} – ${collectionLabel} | Pouf Furniture`
  const canonicalUrl = `${SITE_URL}/products/${collection}/${product.slug}/`

  const images = Array.from({ length: product.imageCount }, (_, i) =>
    `${SITE_URL}${imgUrl(collection, product.slug, i + 1)}`
  )

  const collectionPageUrl = `${SITE_URL}/collection/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.metaDesc,
    image: images,
    brand: { '@type': 'Brand', name: 'Pouf Furniture' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Pouf Furniture',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'İnegöl',
        addressRegion: 'Bursa',
        addressCountry: 'TR',
      },
    },
    category: collectionLabel,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: collectionLabel, item: collectionPageUrl },
      { '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl },
    ],
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={product.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={product.metaDesc} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={images[0]} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={images[0]} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/tr/products/${collection}/${product.slug}/`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav activePage="collection" alwaysDark />

      {/* PRODUCT HERO */}
      <section style={{ background: '#0D2118', paddingTop: 100, paddingBottom: 0, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full pt-8">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <Link href="/" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none' }}>Home</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 10, color: 'rgba(254,254,254,0.2)' }} />
            <Link href="/collection" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none' }}>Collections</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 10, color: 'rgba(254,254,254,0.2)' }} />
            <Link href={`/collection#${collection}`} style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none' }}>{collectionLabel}</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 10, color: 'rgba(254,254,254,0.2)' }} />
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start pb-16">
            {/* Gallery */}
            <div>
              <div
                style={{ position: 'relative', background: '#1C3A2E', overflow: 'hidden', marginBottom: 12 }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={imgUrl(collection, product.slug, activeImg + 1)}
                  alt={`${product.name} — photo ${activeImg + 1}`}
                  className="gallery-main-img"
                  onClick={() => setLbOpen(true)}
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'opacity 0.18s ease, transform 0.18s ease',
                    opacity: switching ? 0 : 1,
                    transform: switching ? 'scale(0.97)' : 'scale(1)',
                  }}
                />
                <button
                  onClick={() => setLbOpen(true)}
                  aria-label="View fullscreen"
                  style={{
                    position: 'absolute', bottom: 14, left: 14,
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4,
                    color: '#FEFEFE', fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px',
                    fontFamily: "'League Spartan',sans-serif", fontWeight: 600, letterSpacing: '0.06em',
                  }}
                >
                  <i className="ti ti-zoom-in" style={{ fontSize: 14 }} /> Tap to zoom
                </button>
                {product.imageCount > 1 && (
                  <>
                    <button
                      onClick={() => goImg((activeImg - 1 + product.imageCount) % product.imageCount)}
                      className="lb-arrow gallery-arrow"
                      style={{ left: 14 }}
                      aria-label="Previous image"
                    >
                      <i className="ti ti-chevron-left" />
                    </button>
                    <button
                      onClick={() => goImg((activeImg + 1) % product.imageCount)}
                      className="lb-arrow gallery-arrow"
                      style={{ right: 14 }}
                      aria-label="Next image"
                    >
                      <i className="ti ti-chevron-right" />
                    </button>
                  </>
                )}
                <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#FEFEFE', padding: '5px 12px' }}>
                  {activeImg + 1} / {product.imageCount}
                </div>
                {product.badge && (
                  <div style={{ position: 'absolute', top: 14, left: 14 }} className={`badge ${product.badgeStyle}`}>{product.badge}</div>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.imageCount > 1 && (
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'thin', scrollbarColor: '#FF914D transparent' }}>
                  {Array.from({ length: product.imageCount }, (_, i) => (
                    <div
                      key={i}
                      className={`lb-thumb${i === activeImg ? ' active' : ''}`}
                      style={{ width: 80, height: 60, flexShrink: 0 }}
                      onClick={() => goImg(i)}
                    >
                      <img src={imgUrl(collection, product.slug, i + 1)} alt={`Photo ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div className="chip chip-orange">
                  <i className="ti ti-diamond" style={{ fontSize: 9 }} />
                  {collectionLabel}
                </div>
              </div>
              <div className="prod-category-tag" style={{ marginBottom: 10 }}>
                <i className={`ti ${product.categoryIcon}`} style={{ fontSize: 10 }} /> {product.category}
              </div>
              <h1 style={{ fontFamily: "'League Spartan',sans-serif", fontWeight: 900, fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '-0.04em', lineHeight: 0.92, color: '#FEFEFE', marginBottom: 24 }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(254,254,254,0.65)', marginBottom: 32 }}>
                {product.desc}
              </p>

              {/* Spec tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
                {[
                  { icon: 'ti-map-pin', label: 'Made in İnegöl, Turkey' },
                  { icon: 'ti-ship', label: 'Export Ready' },
                  { icon: 'ti-adjustments-horizontal', label: 'OEM Available' },
                  { icon: 'ti-shield-check', label: '2-Year Guarantee' },
                ].map(tag => (
                  <div key={tag.label} className="chip chip-white">
                    <i className={`ti ${tag.icon}`} style={{ fontSize: 10 }} /> {tag.label}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link href="/#contact" className="btn btn-orange" style={{ padding: '16px 32px', justifyContent: 'center' }}>
                  Request a Trade Quote <i className="ti ti-arrow-right" />
                </Link>
                <a href="https://wa.me/905432455503" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ padding: '14px 32px', justifyContent: 'center' }}>
                  <i className="ti ti-brand-whatsapp" /> WhatsApp: +90 543 245 5503
                </a>
                <Link href={`/collection#${collection}`} className="btn-ghost" style={{ justifyContent: 'center' }}>
                  <i className="ti ti-arrow-left" /> Back to {collectionLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section style={{ background: '#1C3A2E', padding: '80px 0' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
            <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>More from {collectionLabel}</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#FEFEFE', marginBottom: 40 }}>Related Models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/products/${collection}/${p.slug}/`}
                  className={`prod-card reveal${i > 0 ? ` reveal-d${i}` : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="prod-img">
                    <img src={imgUrl(collection, p.slug, collection === 'modern' ? 2 : 1)} alt={`Pouf ${p.name}`} />
                    <div className="prod-img-overlay" />
                  </div>
                  <div className="prod-body">
                    <div className="prod-category-tag"><i className={`ti ${p.categoryIcon}`} style={{ fontSize: 9 }} /> {p.category}</div>
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-desc" style={{ WebkitLineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>{p.desc}</div>
                    <div className="prod-actions">
                      <div className="chip chip-white" style={{ fontSize: 9, padding: '4px 10px' }}>Export Ready</div>
                      <span className="enquire-btn">View Model <i className="ti ti-arrow-right" style={{ fontSize: 10 }} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* FULLSCREEN LIGHTBOX */}
      {lbOpen && (
        <div
          id="lightbox"
          className="open"
          role="dialog"
          aria-modal="true"
          onClick={e => e.target === e.currentTarget && setLbOpen(false)}
        >
          <div id="lb-header">
            <div>
              <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 4 }}>{collectionLabel}</div>
              <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', color: '#FEFEFE' }}>{product.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(254,254,254,0.35)' }}>
                {activeImg + 1} / {product.imageCount}
              </span>
              <button id="lb-close" onClick={() => setLbOpen(false)} aria-label="Close"><i className="ti ti-x" /></button>
            </div>
          </div>
          <div id="lb-main-wrap" onTouchStart={lbTouchStart} onTouchEnd={lbTouchEnd}>
            {product.imageCount > 1 && (
              <button className="lb-arrow" style={{ left: 14 }} onClick={() => goImg((activeImg - 1 + product.imageCount) % product.imageCount)} aria-label="Previous">
                <i className="ti ti-chevron-left" />
              </button>
            )}
            <img
              id="lb-main-img"
              className={switching ? 'switching' : ''}
              src={imgUrl(collection, product.slug, activeImg + 1)}
              alt={`${product.name} — photo ${activeImg + 1}`}
            />
            {product.imageCount > 1 && (
              <button className="lb-arrow" style={{ right: 14 }} onClick={() => goImg((activeImg + 1) % product.imageCount)} aria-label="Next">
                <i className="ti ti-chevron-right" />
              </button>
            )}
          </div>
          {product.imageCount > 1 && (
            <div id="lb-thumbs">
              {Array.from({ length: product.imageCount }, (_, i) => (
                <div
                  key={i}
                  className={`lb-thumb${i === activeImg ? ' active' : ''}`}
                  onClick={() => goImg(i)}
                >
                  <img src={imgUrl(collection, product.slug, i + 1)} alt={`Photo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const paths = allProducts.map(p => ({
    params: { collection: p.collection, slug: p.slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { collection, slug } = params
  const product = getProduct(collection, slug)
  if (!product) return { notFound: true }

  const sourceList = collection === 'luxury' ? luxuryProducts : modernProducts
  const relatedProducts = sourceList
    .filter(p => p.slug !== slug)
    .slice(0, 3)
    .map(p => ({ ...p, collection, collectionLabel: collection === 'luxury' ? 'Luxury Collection' : 'Contemporary' }))

  return {
    props: {
      product: { ...product, collection, collectionLabel: collection === 'luxury' ? 'Luxury Collection' : 'Contemporary' },
      collection,
      relatedProducts,
    },
  }
}
