import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { luxuryProducts, modernProducts, imgUrl } from '../../data/products'

const SITE_URL = 'https://www.pouffurnitures.com'

export default function CollectionTR() {
  const [activeTab, setActiveTab] = useState('luxury')
  const [lb, setLb] = useState(null)
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
    if (lb) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
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
        <title>Koleksiyonlar — Pouf Furniture | Lüks &amp; Çağdaş Türk Mobilyası</title>
        <meta name="description" content="Pouf'un iki amiral koleksiyonuna göz atın: görkemli Lüks Koleksiyon ve rafine Çağdaş Koleksiyon. İnegöl, Türkiye'den dünya genelinde B2B ihracata hazır 22 model." />
        <meta httpEquiv="content-language" content="tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Koleksiyonlar — Pouf Furniture | Lüks & Çağdaş Türk Mobilyası" />
        <meta property="og:description" content="İki koleksiyonda 22 model — Lüks ve Çağdaş. B2B toptan ihracat için premium Türk mobilyası." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/tr/collection/`} />
        <link rel="canonical" href={`${SITE_URL}/tr/collection/`} />
        <meta property="og:image" content={`${SITE_URL}/images/luxury/lagos/pouf-luxury-lagos-01.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/images/luxury/lagos/pouf-luxury-lagos-01.jpg`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/collection/`} />
        <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/tr/collection/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/collection/`} />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav activePage="collection" alwaysDark locale="tr" />

      {/* PAGE HERO */}
      <section style={{ background: '#0D2118', padding: '140px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb pulse-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,145,77,0.1) 0%,transparent 70%)', top: -200, right: -150 }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Link href="/tr" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none' }}>Ana Sayfa</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 11, color: 'rgba(254,254,254,0.2)' }} />
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>Koleksiyonlar</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <div className="chip chip-orange reveal" style={{ marginBottom: 20 }}>
                <i className="ti ti-layout-grid" style={{ fontSize: 10 }} />
                22 Model · 2 Koleksiyon
              </div>
              <h1 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(48px,8vw,100px)', color: '#FEFEFE' }}>
                Ürün<br /><em style={{ color: '#FF914D', fontStyle: 'italic' }}>Kataloğumuz</em>
              </h1>
            </div>
            <div className="reveal reveal-d2">
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(254,254,254,0.55)', maxWidth: 460, marginBottom: 28 }}>
                İki farklı mobilya hattı — görkemli Lüks Koleksiyon ve rafine Çağdaş serisi — her ikisi de Türkiye'de üretilmekte ve küresel B2B ihracata sunulmaktadır.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button onClick={() => switchTab('luxury')} className="btn btn-orange" style={{ padding: '12px 28px' }}>Lüks Koleksiyon</button>
                <button onClick={() => switchTab('modern')} className="btn btn-outline-white" style={{ padding: '10px 26px' }}>Çağdaş</button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 56, display: 'flex', borderBottom: '1px solid rgba(254,254,254,0.1)', overflowX: 'auto' }}>
            <button className={`cat-tab${activeTab === 'luxury' ? ' active' : ''}`} onClick={() => switchTab('luxury')}>
              <i className="ti ti-diamond" style={{ marginRight: 6, fontSize: 13 }} />Lüks Koleksiyon <span style={{ opacity: 0.5, marginLeft: 6 }}>(12)</span>
            </button>
            <button className={`cat-tab${activeTab === 'modern' ? ' active' : ''}`} onClick={() => switchTab('modern')}>
              <i className="ti ti-layout-2" style={{ marginRight: 6, fontSize: 13 }} />Çağdaş <span style={{ opacity: 0.5, marginLeft: 6 }}>(10)</span>
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
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(254,254,254,0.4)' }}>12 model · Koltuklar, Yemek Odası &amp; Tam Oda Takımları</div>
                </div>
              </div>
              <h2 className="sec-heading reveal" style={{ fontSize: 'clamp(32px,5vw,60px)', color: '#FEFEFE' }}>Lüks Koleksiyon</h2>
              <p className="reveal reveal-d1" style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.7, color: 'rgba(254,254,254,0.5)', maxWidth: 480, marginTop: 12 }}>
                El işçiliği altın aksan, zengin kakma ve premium döşemeli görkemli barok ve art deco takımlar. Premium showroom'lar ve üst düzey konut projeleri için tasarlandı.
              </p>
            </div>
            <Link href="/tr/#contact" className="btn-ghost reveal">Katalog PDF İste <i className="ti ti-download" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {luxuryProducts.map((p, i) => (
              <ProductCardTR key={p.slug} product={p} collection="luxury" delay={i % 3} onOpen={() => openLb('luxury', p.slug, p.name, p.imageCount)} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTEMPORARY COLLECTION */}
      <section id="modern" ref={modernRef} className="coll-section" style={{ background: '#152C22' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 3, height: 32, background: '#FF914D' }} />
                <div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(254,254,254,0.4)' }}>10 model · Koltuklar, Köşe Takımları &amp; Modüler Oturma</div>
                </div>
              </div>
              <h2 className="sec-heading reveal" style={{ fontSize: 'clamp(32px,5vw,60px)', color: '#FEFEFE' }}>Çağdaş</h2>
              <p className="reveal reveal-d1" style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.7, color: 'rgba(254,254,254,0.5)', maxWidth: 500, marginTop: 12 }}>
                Temiz mimari hatlar, premium bouclé ve performans kumaşlar, doğal meşe ve ceviz tabanlar. Çağdaş perakende, konaklama ve kurumsal iç mekanlar için uygun.
              </p>
            </div>
            <Link href="/tr/#contact" className="btn-ghost reveal">Katalog PDF İste <i className="ti ti-download" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modernProducts.map((p, i) => (
              <ProductCardTR key={p.slug} product={p} collection="modern" delay={i % 3} onOpen={() => openLb('modern', p.slug, p.name, p.imageCount)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#FF914D', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-45deg,#000 0,#000 1px,transparent 1px,transparent 12px)', pointerEvents: 'none' }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
          <div className="max-w-2xl">
            <div className="eyebrow reveal" style={{ color: 'rgba(0,0,0,0.5)', marginBottom: 14 }}>Ticari sipariş vermeye hazır mısınız?</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,6vw,72px)', color: '#000', marginBottom: 20 }}>Ticari Teklif<br />İsteyin</h2>
            <p className="reveal reveal-d2" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.65, color: 'rgba(0,0,0,0.65)', marginBottom: 36, maxWidth: 480 }}>
              İhracat ekibimiz bir iş günü içinde FOB fiyatlandırma, teslim süreleri ve pazarınız için ticaret koşullarıyla yanıt verecektir.
            </p>
            <div className="flex flex-wrap gap-4 reveal reveal-d3">
              <Link href="/tr/#contact" className="btn" style={{ background: '#000', color: '#FEFEFE', padding: '16px 38px', fontSize: 13 }}>İhracat Ekibi ile İletişim <i className="ti ti-arrow-right" /></Link>
              <a href="#" className="btn" style={{ background: 'transparent', color: '#000', border: '2px solid rgba(0,0,0,0.4)', padding: '14px 36px', fontSize: 13 }}>Katalog PDF İndir <i className="ti ti-download" /></a>
            </div>
          </div>
        </div>
      </section>

      <Footer locale="tr" />

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
                {lb.collection === 'luxury' ? 'Lüks Koleksiyon' : 'Çağdaş'}
              </div>
              <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', color: '#FEFEFE' }}>{lb.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(254,254,254,0.35)' }}>
                {lb.idx + 1} / {lb.total}
              </span>
              <Link href={`/tr/products/${lb.collection}/${lb.slug}`} className="btn btn-orange" style={{ fontSize: 11, padding: '10px 18px' }} onClick={() => setLb(null)}>
                Detay Sayfası <i className="ti ti-arrow-right" style={{ fontSize: 11 }} />
              </Link>
              <button id="lb-close" onClick={() => setLb(null)} aria-label="Kapat"><i className="ti ti-x" /></button>
            </div>
          </div>
          <div id="lb-main-wrap" onTouchStart={lbTouchStart} onTouchEnd={lbTouchEnd}>
            <button className="lb-arrow" style={{ left: 14 }} onClick={() => navLb(-1)} aria-label="Önceki"><i className="ti ti-chevron-left" /></button>
            <img
              id="lb-main-img"
              className={lbSwitching ? 'switching' : ''}
              src={imgUrl(lb.collection, lb.slug, lb.idx + 1)}
              alt={`${lb.name} — fotoğraf ${lb.idx + 1}`}
            />
            <button className="lb-arrow" style={{ right: 14 }} onClick={() => navLb(1)} aria-label="Sonraki"><i className="ti ti-chevron-right" /></button>
          </div>
          <div id="lb-thumbs">
            {[...Array(lb.total)].map((_, i) => (
              <div
                key={i}
                className={`lb-thumb${i === lb.idx ? ' active' : ''}`}
                onClick={() => { setLbSwitching(true); setTimeout(() => { setLb(prev => ({ ...prev, idx: i })); setLbSwitching(false) }, 200) }}
              >
                <img src={imgUrl(lb.collection, lb.slug, i + 1)} alt={`Fotoğraf ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ProductCardTR({ product, collection, delay, onOpen }) {
  const d = delay > 0 ? ` reveal-d${delay}` : ''
  return (
    <div className={`prod-card reveal${d}`} onClick={onOpen} style={{ cursor: 'pointer' }}>
      <div className="prod-img">
        <img src={imgUrl(collection, product.slug, collection === 'modern' ? 2 : 1)} alt={`Pouf ${product.name}`} />
        <div className="prod-img-overlay" />
        <div className="prod-view">
          <button className="btn btn-orange-sm" style={{ pointerEvents: 'none' }}>
            <i className="ti ti-photo" /> Galeriyi Gör
          </button>
        </div>
        <div className="prod-photo-count">
          <i className="ti ti-photo" style={{ fontSize: 10 }} /> {product.imageCount} fotoğraf
        </div>
        {product.badge && (
          <div style={{ position: 'absolute', top: 12, left: 12 }} className={`badge ${product.badgeStyle}`}>{product.badge}</div>
        )}
      </div>
      <div className="prod-body">
        <div className="prod-category-tag">
          <i className={`ti ${product.categoryIcon}`} style={{ fontSize: 9 }} /> {product.categoryTr || product.category}
        </div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-desc">{product.descTr || product.desc}</div>
        <div className="prod-actions">
          <div className="chip chip-white" style={{ fontSize: 9, padding: '4px 10px' }}>İhracata Hazır</div>
          <Link
            href={`/tr/products/${collection}/${product.slug}`}
            className="enquire-btn"
            onClick={e => e.stopPropagation()}
          >
            Detayı Gör <i className="ti ti-arrow-right" style={{ fontSize: 10 }} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
