import { useEffect, useRef, useState, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { luxuryProducts, modernProducts, imgUrl } from '../data/products'

export default function Collection() {
  const [activeTab, setActiveTab] = useState('luxury')
  const [lb, setLb] = useState(null) // { collection, slug, name, total, idx }
  const [lbSwitching, setLbSwitching] = useState(false)
  const luxuryRef = useRef(null)
  const modernRef = useRef(null)
  const lbTouchX = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handler = () => {
      const lux = luxuryRef.current?.getBoundingClientRect().top ?? 0
      const mod = modernRef.current?.getBoundingClientRect().top ?? 0
      if (mod < window.innerHeight / 2) setActiveTab('modern')
      else if (lux < window.innerHeight / 2) setActiveTab('luxury')
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#modern') {
      setTimeout(() => modernRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }, [])

  useEffect(() => {
    if (lb) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lb])

  useEffect(() => {
    if (!lb) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') navLb(1)
      else if (e.key === 'ArrowLeft') navLb(-1)
      else if (e.key === 'Escape') setLb(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lb])

  function openLb(collection, slug, name, total) {
    setLb({ collection, slug, name, total, idx: 0 })
  }

  function navLb(dir) {
    setLbSwitching(true)
    setTimeout(() => {
      setLb(prev => ({ ...prev, idx: (prev.idx + dir + prev.total) % prev.total }))
      setLbSwitching(false)
    }, 200)
  }

  function lbTouchStart(e) { lbTouchX.current = e.touches[0].clientX }
  function lbTouchEnd(e) {
    if (lbTouchX.current === null) return
    const delta = e.changedTouches[0].clientX - lbTouchX.current
    lbTouchX.current = null
    if (Math.abs(delta) < 40) return
    navLb(delta < 0 ? 1 : -1)
  }

  function switchTab(target) {
    setActiveTab(target)
    const el = target === 'luxury' ? luxuryRef.current : modernRef.current
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Head>
        <title>Furniture Collections — Luxury &amp; Contemporary | Pouf</title>
        <meta name="description" content="Browse Pouf's Luxury and Contemporary furniture collections. 22 B2B sofa and dining models from İnegöl, Turkey. Request trade quotes for wholesale export." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Furniture Collections — Luxury & Contemporary | Pouf" />
        <meta property="og:description" content="22 models across two collections — Luxury and Contemporary. Premium Turkish furniture for B2B wholesale export." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pouffurnitures.com/collection/" />
        <meta property="og:image" content="https://www.pouffurnitures.com/images/luxury/lagos/pouf-luxury-lagos-01.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.pouffurnitures.com/images/luxury/lagos/pouf-luxury-lagos-01.jpg" />
        <link rel="canonical" href="https://www.pouffurnitures.com/collection/" />
        <link rel="alternate" hrefLang="en" href="https://www.pouffurnitures.com/collection/" />
        <link rel="alternate" hrefLang="tr" href="https://www.pouffurnitures.com/tr/collection/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pouffurnitures.com/collection/" />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav activePage="collection" alwaysDark />

      {/* PAGE HERO */}
      <section style={{ background: '#0D2118', padding: '140px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb pulse-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,145,77,0.1) 0%,transparent 70%)', top: -200, right: -150 }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Link href="/" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none', transition: 'color 0.15s' }}>Home</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 11, color: 'rgba(254,254,254,0.2)' }} />
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>Collections</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <div className="chip chip-orange reveal" style={{ marginBottom: 20 }}>
                <i className="ti ti-layout-grid" style={{ fontSize: 10 }} />
                22 Models · 2 Collections
              </div>
              <h1 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(48px,8vw,100px)', color: '#FEFEFE' }}>
                Our Product<br /><em style={{ color: '#FF914D', fontStyle: 'italic' }}>Catalogue</em>
              </h1>
            </div>
            <div className="reveal reveal-d2">
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(254,254,254,0.55)', maxWidth: 460, marginBottom: 28 }}>
                Two distinct furniture lines — an opulent Luxury Collection and a refined Contemporary range — both manufactured in Turkey and available for global B2B export.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button onClick={() => switchTab('luxury')} className="btn btn-orange" style={{ padding: '12px 28px' }}>Luxury Collection</button>
                <button onClick={() => switchTab('modern')} className="btn btn-outline-white" style={{ padding: '10px 26px' }}>Contemporary</button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 56, display: 'flex', borderBottom: '1px solid rgba(254,254,254,0.1)', overflowX: 'auto' }}>
            <button className={`cat-tab${activeTab === 'luxury' ? ' active' : ''}`} onClick={() => switchTab('luxury')}>
              <i className="ti ti-diamond" style={{ marginRight: 6, fontSize: 13 }} />Luxury Collection <span style={{ opacity: 0.5, marginLeft: 6 }}>(12)</span>
            </button>
            <button className={`cat-tab${activeTab === 'modern' ? ' active' : ''}`} onClick={() => switchTab('modern')}>
              <i className="ti ti-layout-2" style={{ marginRight: 6, fontSize: 13 }} />Contemporary <span style={{ opacity: 0.5, marginLeft: 6 }}>(10)</span>
            </button>
          </div>
        </div>
      </section>

      {/* LUXURY COLLECTION */}
      <section id="luxury" ref={luxuryRef} className="coll-section" style={{ background: '#1C3A2E' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 3, height: 32, background: '#FF914D' }} />
                <div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(254,254,254,0.4)' }}>12 models · Sofas, Dining &amp; Full Room Suites</div>
                </div>
              </div>
              <h2 className="sec-heading reveal" style={{ fontSize: 'clamp(32px,5vw,60px)', color: '#FEFEFE' }}>Luxury Collection</h2>
              <p className="reveal reveal-d1" style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.7, color: 'rgba(254,254,254,0.5)', maxWidth: 480, marginTop: 12 }}>
                Opulent baroque and art deco suites with hand-finished gold accents, intricate marquetry, and premium upholstery. Designed for premium showrooms and high-end residential projects.
              </p>
            </div>
            <Link href="/#contact" className="btn-ghost reveal">Request Catalogue PDF <i className="ti ti-download" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {luxuryProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} collection="luxury" delay={i % 3} onOpen={() => openLb('luxury', p.slug, p.name, p.imageCount)} />
            ))}
          </div>
        </div>
      </section>

      {/* MODERN COLLECTION */}
      <section id="modern" ref={modernRef} className="coll-section" style={{ background: '#152C22' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 3, height: 32, background: '#FF914D' }} />
                <div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(254,254,254,0.4)' }}>10 models · Sofas, Sectionals &amp; Modular Seating</div>
                </div>
              </div>
              <h2 className="sec-heading reveal" style={{ fontSize: 'clamp(32px,5vw,60px)', color: '#FEFEFE' }}>Contemporary</h2>
              <p className="reveal reveal-d1" style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.7, color: 'rgba(254,254,254,0.5)', maxWidth: 500, marginTop: 12 }}>
                Clean architectural lines, premium bouclé and performance fabrics, natural oak and walnut bases. Suited for contemporary retail, hospitality, and contract interiors.
              </p>
            </div>
            <Link href="/#contact" className="btn-ghost reveal">Request Catalogue PDF <i className="ti ti-download" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modernProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} collection="modern" delay={i % 3} onOpen={() => openLb('modern', p.slug, p.name, p.imageCount)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#FF914D', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,#000 0,#000 1px,transparent 1px,transparent 12px)', pointerEvents: 'none' }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
          <div className="max-w-2xl">
            <div className="eyebrow reveal" style={{ color: 'rgba(0,0,0,0.5)', marginBottom: 14 }}>Ready to place a trade order?</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,6vw,72px)', color: '#000', marginBottom: 20 }}>Request a<br />Trade Quote</h2>
            <p className="reveal reveal-d2" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.65, color: 'rgba(0,0,0,0.65)', marginBottom: 36, maxWidth: 480 }}>
              Our export team will respond within one business day with FOB pricing, lead times, and trade terms for your market.
            </p>
            <div className="flex flex-wrap gap-4 reveal reveal-d3">
              <Link href="/#contact" className="btn" style={{ background: '#000', color: '#FEFEFE', padding: '16px 38px', fontSize: 13 }}>Contact Export Team <i className="ti ti-arrow-right" /></Link>
              <a href="#" className="btn" style={{ background: 'transparent', color: '#000', border: '2px solid rgba(0,0,0,0.4)', padding: '14px 36px', fontSize: 13 }}>Download Catalogue PDF <i className="ti ti-download" /></a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* LIGHTBOX */}
      {lb && (
        <div
          id="lightbox"
          className="open"
          role="dialog"
          aria-modal="true"
          onClick={e => e.target === e.currentTarget && setLb(null)}
        >
          <div id="lb-header">
            <div>
              <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 4 }}>
                {lb.collection === 'luxury' ? 'Luxury Collection' : 'Contemporary'}
              </div>
              <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', color: '#FEFEFE' }}>{lb.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(254,254,254,0.35)' }}>
                {lb.idx + 1} / {lb.total}
              </span>
              <Link href={`/products/${lb.collection}/${lb.slug}`} className="btn btn-orange" style={{ fontSize: 11, padding: '10px 18px' }} onClick={() => setLb(null)}>
                View Detail Page <i className="ti ti-arrow-right" style={{ fontSize: 11 }} />
              </Link>
              <button id="lb-close" onClick={() => setLb(null)} aria-label="Close"><i className="ti ti-x" /></button>
            </div>
          </div>
          <div id="lb-main-wrap" onTouchStart={lbTouchStart} onTouchEnd={lbTouchEnd}>
            <button className="lb-arrow" style={{ left: 14 }} onClick={() => navLb(-1)} aria-label="Previous"><i className="ti ti-chevron-left" /></button>
            <img
              id="lb-main-img"
              className={lbSwitching ? 'switching' : ''}
              src={imgUrl(lb.collection, lb.slug, lb.idx + 1)}
              alt={`${lb.name} — photo ${lb.idx + 1}`}
            />
            <button className="lb-arrow" style={{ right: 14 }} onClick={() => navLb(1)} aria-label="Next"><i className="ti ti-chevron-right" /></button>
          </div>
          <div id="lb-thumbs">
            {[...Array(lb.total)].map((_, i) => (
              <div
                key={i}
                className={`lb-thumb${i === lb.idx ? ' active' : ''}`}
                onClick={() => { setLbSwitching(true); setTimeout(() => { setLb(prev => ({ ...prev, idx: i })); setLbSwitching(false) }, 200) }}
              >
                <img src={imgUrl(lb.collection, lb.slug, i + 1)} alt={`Photo ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ProductCard({ product, collection, delay, onOpen }) {
  const d = delay > 0 ? ` reveal-d${delay}` : ''
  return (
    <div className={`prod-card reveal${d}`} onClick={onOpen} style={{ cursor: 'pointer' }}>
      <div className="prod-img">
        <img src={imgUrl(collection, product.slug, collection === 'modern' ? 2 : 1)} alt={`Pouf ${product.collectionLabel || ''} ${product.name}`} />
        <div className="prod-img-overlay" />
        <div className="prod-view">
          <button className="btn btn-orange-sm" style={{ pointerEvents: 'none' }}>
            <i className="ti ti-photo" /> View Gallery
          </button>
        </div>
        <div className="prod-photo-count">
          <i className="ti ti-photo" style={{ fontSize: 10 }} /> {product.imageCount} photos
        </div>
        {product.badge && (
          <div style={{ position: 'absolute', top: 12, left: 12 }} className={`badge ${product.badgeStyle}`}>{product.badge}</div>
        )}
      </div>
      <div className="prod-body">
        <div className="prod-category-tag">
          <i className={`ti ${product.categoryIcon}`} style={{ fontSize: 9 }} /> {product.category}
        </div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-desc">{product.desc}</div>
        <div className="prod-actions">
          <div className="chip chip-white" style={{ fontSize: 9, padding: '4px 10px' }}>Export Ready</div>
          <Link
            href={`/products/${collection}/${product.slug}`}
            className="enquire-btn"
            onClick={e => e.stopPropagation()}
          >
            View Detail <i className="ti ti-arrow-right" style={{ fontSize: 10 }} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
