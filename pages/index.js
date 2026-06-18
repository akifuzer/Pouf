import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const heroSlides = [
  { img: '/images/luxury/bentley/pouf-luxury-bentley-01.jpg', name: 'Bentley', label: 'Luxury Collection', collection: 'luxury', slug: 'bentley' },
  { img: '/images/luxury/angel-pro/pouf-luxury-angel-pro-01.jpg', name: 'Angel Pro', label: 'Luxury Collection', collection: 'luxury', slug: 'angel-pro' },
  { img: '/images/modern/asya/pouf-modern-asya-02.jpg', name: 'Asya', label: 'Contemporary', collection: 'modern', slug: 'asya' },
  { img: '/images/modern/maveron/pouf-modern-maveron-02.jpg', name: 'Maveron', label: 'Contemporary', collection: 'modern', slug: 'maveron' },
]

export default function Home() {
  const [formSent, setFormSent] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const heroIdxRef = useRef(0)
  const heroTouchX = useRef(null)

  function goSlide(newIdx) {
    if (newIdx === heroIdxRef.current) return
    heroIdxRef.current = newIdx
    setHeroIdx(newIdx)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => goSlide((heroIdxRef.current + 1) % heroSlides.length), 4500)
    return () => clearInterval(t)
  }, [])

  function heroTouchStart(e) { heroTouchX.current = e.touches[0].clientX }
  function heroTouchEnd(e) {
    if (heroTouchX.current === null) return
    const delta = e.changedTouches[0].clientX - heroTouchX.current
    heroTouchX.current = null
    if (Math.abs(delta) < 40) return
    goSlide(delta < 0
      ? (heroIdxRef.current + 1) % heroSlides.length
      : (heroIdxRef.current - 1 + heroSlides.length) % heroSlides.length)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormLoading(true)
    setFormError(false)
    try {
      const res = await fetch('https://formspree.io/f/maqvvdwr', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setFormSent(true)
        if (typeof window.gtag_report_conversion === 'function') {
          window.gtag_report_conversion()
        }
      } else {
        setFormError(true)
      }
    } catch {
      setFormError(true)
    } finally {
      setFormLoading(false)
    }
  }

  const marqueeItems = [
    'Premium Turkish Manufacturer', 'Rooted in İnegöl, Turkey', 'B2B Wholesale & Trade',
    'OEM & Custom Orders Accepted', '2-Year Quality Guarantee', 'MOQ-Friendly Export Terms',
  ]

  return (
    <>
      <Head>
        <title>Pouf Furniture — Turkish B2B Furniture Manufacturer &amp; Exporter</title>
        <meta name="description" content="Pouf is a premium B2B furniture manufacturer from İnegöl, Turkey. 25 years of family expertise. Luxury and contemporary collections for wholesale export worldwide." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Pouf Furniture — Turkish B2B Furniture Manufacturer & Exporter" />
        <meta property="og:description" content="B2B furniture manufacturer and exporter from İnegöl, Turkey. Luxury & Contemporary collections. OEM, custom orders, and wholesale export worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pouffurnitures.com/" />
        <meta property="og:image" content="https://www.pouffurnitures.com/images/luxury/lagos/pouf-luxury-lagos-01.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.pouffurnitures.com/images/luxury/lagos/pouf-luxury-lagos-01.jpg" />
        <link rel="canonical" href="https://www.pouffurnitures.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.pouffurnitures.com/" />
        <link rel="alternate" hrefLang="tr" href="https://www.pouffurnitures.com/tr/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pouffurnitures.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Organization', 'WebSite'],
            '@id': 'https://www.pouffurnitures.com/#organization',
            name: 'Pouf Furniture',
            url: 'https://www.pouffurnitures.com',
            logo: 'https://www.pouffurnitures.com/brand_assets/main_logo.png',
            description: 'Premium B2B furniture manufacturer and exporter from İnegöl, Turkey. 25 years of family expertise.',
            foundingDate: '2000',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'İnegöl',
              addressRegion: 'Bursa',
              addressCountry: 'TR',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              availableLanguage: ['English', 'Turkish'],
            },
            sameAs: [
              'https://www.instagram.com/pouffurniture/',
              'https://www.facebook.com/pouffurnitures/',
              'https://www.linkedin.com/company/pouffurnitures/',
            ],
          }) }}
        />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav activePage="home" />

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: '#1C3A2E', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 60 }}>
        <div className="orb pulse-glow" style={{ width: 700, height: 700, background: 'radial-gradient(circle,rgba(255,145,77,0.1) 0%,transparent 70%)', top: -200, right: -100 }} />
        <div className="orb pulse-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(0,70,173,0.06) 0%,transparent 70%)', top: '30%', left: '35%', animationDelay: '2s' }} />
        <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontFamily: "'League Spartan',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.15)', whiteSpace: 'nowrap' }} className="hidden lg:block">
          Turkish Manufacturer &amp; Exporter &nbsp;·&nbsp; Est. 2000
        </div>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <div>
              <div className="chip chip-orange mb-8">
                <i className="ti ti-world" style={{ fontSize: 10 }} />
                Global Furniture Exporter
              </div>
              <h1 className="display-xl mb-8" style={{ color: '#FEFEFE' }}>
                Crafted in<br />Turkey,<br />Sold to the<br /><em style={{ color: '#FF914D', fontStyle: 'italic' }}>World.</em>
              </h1>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.7, color: 'rgba(254,254,254,0.6)', maxWidth: 440, marginBottom: 40 }}>
                Pouf is a premium Turkish furniture manufacturer and B2B exporter based in İnegöl. Built on 25 years of family expertise, we supply wholesalers, retailers, and trade partners worldwide with luxury and contemporary furniture collections.
              </p>
              <div className="flex flex-wrap gap-4 mb-14">
                <Link href="/collection" className="btn btn-orange" style={{ fontSize: 13, padding: '16px 38px' }}>
                  View Catalogue <i className="ti ti-arrow-right" />
                </Link>
                <Link href="#contact" className="btn btn-outline-white" style={{ fontSize: 13, padding: '14px 36px' }}>
                  Request a Quote
                </Link>
              </div>
              <div className="flex items-center gap-8" style={{ borderTop: '1px solid rgba(254,254,254,0.1)', paddingTop: 28 }}>
                <div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D', lineHeight: 1 }}>10+</div>
                  <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.4)', marginTop: 4 }}>İnegöl Partners</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'rgba(254,254,254,0.12)' }} />
                <div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D', lineHeight: 1 }}>25+</div>
                  <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.4)', marginTop: 4 }}>Years Legacy</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'rgba(254,254,254,0.12)' }} />
                <div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D', lineHeight: 1 }}>100%</div>
                  <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.4)', marginTop: 4 }}>Turkish Made</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Desktop: accordion expand gallery */}
              <div className="hidden lg:flex" style={{ gap: 6, height: 540 }}>
                {heroSlides.map((slide, i) => (
                  <a
                    key={slide.slug}
                    href={`/products/${slide.collection}/${slide.slug}/`}
                    onMouseEnter={() => { heroIdxRef.current = i; setHeroIdx(i) }}
                    style={{
                      position: 'relative', overflow: 'hidden', borderRadius: 12,
                      flexGrow: i === heroIdx ? 10 : 1, flexBasis: 44, flexShrink: 0, minWidth: 42,
                      transition: 'flex-grow 0.6s cubic-bezier(0.16,1,0.3,1)',
                      cursor: 'pointer', textDecoration: 'none', display: 'flex',
                      boxShadow: i === heroIdx ? '0 24px 60px rgba(0,0,0,0.45)' : 'none',
                    }}
                  >
                    <img src={slide.img} alt={`Pouf ${slide.name}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,33,24,0.92) 0%, rgba(13,33,24,0.25) 50%, transparent 100%)' }} />
                    {/* Caption — fades in when expanded */}
                    <div style={{
                      position: 'absolute', bottom: 24, left: 22, right: 12, pointerEvents: 'none',
                      opacity: i === heroIdx ? 1 : 0,
                      transform: i === heroIdx ? 'translateY(0)' : 'translateY(12px)',
                      transition: 'opacity 0.35s ease 0.18s, transform 0.35s ease 0.18s',
                    }}>
                      <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 5 }}>{slide.label}</div>
                      <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE', marginBottom: 10 }}>{slide.name}</div>
                      <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FF914D', display: 'flex', alignItems: 'center', gap: 4 }}>
                        View Detail <i className="ti ti-arrow-right" style={{ fontSize: 10 }} />
                      </div>
                    </div>
                    {/* Vertical label when collapsed */}
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
                      opacity: i === heroIdx ? 0 : 1, transition: 'opacity 0.25s ease',
                    }}>
                      <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', writingMode: 'vertical-rl' }}>{slide.name}</span>
                    </div>
                    {/* Active glow dot */}
                    {i === heroIdx && (
                      <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: '#FF914D', boxShadow: '0 0 14px rgba(255,145,77,0.9)' }} />
                    )}
                  </a>
                ))}
              </div>

              {/* Mobile: single image cross-fade carousel */}
              <div className="lg:hidden" style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, boxShadow: '0 40px 80px rgba(0,0,0,0.45)' }}
                onTouchStart={heroTouchStart} onTouchEnd={heroTouchEnd}
              >
                <div style={{ paddingBottom: '72%', position: 'relative' }}>
                  {heroSlides.map((slide, i) => (
                    <img key={slide.slug} src={slide.img} alt={`Pouf ${slide.name}`}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.5s ease', zIndex: i === heroIdx ? 2 : 1 }}
                    />
                  ))}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,33,24,0.8) 0%, transparent 55%)', zIndex: 3 }} />
                  <div style={{ position: 'absolute', top: 20, right: 0, background: '#FF914D', color: '#000', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 8px 24px rgba(255,145,77,0.4)', zIndex: 4 }}>
                    <i className="ti ti-world" style={{ fontSize: 14 }} />
                    <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: '0.04em' }}>İnegöl Made</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 5, alignItems: 'center', zIndex: 4 }}>
                    {heroSlides.map((_, i) => (
                      <button key={i} onClick={() => goSlide(i)} aria-label={`Go to slide ${i + 1}`}
                        style={{ width: i === heroIdx ? 22 : 6, height: 6, background: i === heroIdx ? '#FF914D' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', borderRadius: 3, padding: 0, transition: 'width 0.35s ease, background 0.35s ease' }}
                      />
                    ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: 20, left: 16, zIndex: 4 }}>
                    <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 3 }}>{heroSlides[heroIdx].label}</div>
                    <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE' }}>{heroSlides[heroIdx].name}</div>
                  </div>
                </div>
              </div>

              <div className="scroll-bounce hidden lg:flex" style={{ position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.22)' }}>Scroll</div>
                <i className="ti ti-chevrons-down" style={{ color: '#FF914D', fontSize: 16 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: '#FF914D', padding: '15px 0', overflow: 'hidden' }}>
        <div className="marquee-inner" aria-hidden="true">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
              <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', padding: '0 32px' }}>{item}</span>
              <span style={{ color: '#000', fontSize: 18, opacity: 0.4 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTIONS PREVIEW */}
      <section style={{ background: '#1C3A2E', padding: '100px 0 80px' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Our product lines</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#FEFEFE' }}>Two Distinct<br />Collections</h2>
            </div>
            <Link href="/collection" className="btn-ghost reveal reveal-d2" style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
              View Full Catalogue <i className="ti ti-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Link href="/collection#luxury" className="coll-card reveal" style={{ height: 520 }}>
              <img src="/images/luxury/lagos/pouf-luxury-lagos-01.jpg" alt="Pouf Luxury Collection — ornate Turkish furniture with gold accents" />
              <div className="coll-overlay" />
              <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.5)', marginBottom: 10 }}>12 Models</div>
                <h3 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#FEFEFE', marginBottom: 10, lineHeight: 1.05 }}>Luxury<br />Collection</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.6)', marginBottom: 16, maxWidth: 340 }}>Opulent baroque and art deco suites with hand-finished gold accents. Designed for premium showrooms and high-end residential projects.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="eyebrow" style={{ color: '#FF914D' }}>Explore Collection</span>
                  <i className="ti ti-arrow-right coll-arrow" style={{ color: '#FF914D', fontSize: 14 }} />
                </div>
              </div>
            </Link>
            <Link href="/collection#modern" className="coll-card reveal reveal-d1" style={{ height: 520 }}>
              <img src="/images/modern/asya/pouf-modern-asya-02.jpg" alt="Pouf Contemporary Collection — minimalist Turkish furniture" />
              <div className="coll-overlay" />
              <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.5)', marginBottom: 10 }}>10 Models</div>
                <h3 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#FEFEFE', marginBottom: 10, lineHeight: 1.05 }}>Contemporary</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.6)', marginBottom: 16, maxWidth: 340 }}>Clean lines, premium bouclé and leather upholstery, natural oak bases. Suited for contemporary retail, hospitality, and contract interiors.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="eyebrow" style={{ color: '#FF914D' }}>Explore Collection</span>
                  <i className="ti ti-arrow-right coll-arrow" style={{ color: '#FF914D', fontSize: 14 }} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED MODELS */}
      <section style={{ background: '#F5F0E8', padding: '100px 0' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Handpicked for trade buyers</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#1C3A2E' }}>Featured Models</h2>
            </div>
            <Link href="/collection" className="btn reveal reveal-d2 btn-dark" style={{ alignSelf: 'flex-start' }}>
              View All Models <i className="ti ti-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { collection: 'luxury', slug: 'bentley', name: 'Bentley', label: 'Luxury · Sofa Suite', img: '/images/luxury/bentley/pouf-luxury-bentley-01.jpg', alt: 'Pouf Luxury Bentley Sofa Suite', href: '/collection#luxury' },
              { collection: 'luxury', slug: 'angel-pro', name: 'Angel Pro', label: 'Luxury · Sofa Suite', img: '/images/luxury/angel-pro/pouf-luxury-angel-pro-01.jpg', alt: 'Pouf Luxury Angel Pro Sofa Suite', href: '/collection#luxury' },
              { collection: 'modern', slug: 'asya', name: 'Asya', label: 'Contemporary · Sofa', img: '/images/modern/asya/pouf-modern-asya-02.jpg', alt: 'Pouf Contemporary Asya Sofa', href: '/collection#modern' },
              { collection: 'modern', slug: 'maveron', name: 'Maveron', label: 'Contemporary · Sofa', img: '/images/modern/maveron/pouf-modern-maveron-02.jpg', alt: 'Pouf Contemporary Maveron Sofa', href: '/collection#modern' },
            ].map((m, i) => (
              <div key={m.slug} className={`model-card reveal${i > 0 ? ` reveal-d${i}` : ''}`}>
                <div className="model-img-wrap">
                  <img src={m.img} alt={m.alt} />
                  <div className="model-overlay" />
                  <Link href={m.href} className="model-view-btn btn btn-orange-sm">View in Catalogue</Link>
                </div>
                <div style={{ padding: '18px 18px 22px' }}>
                  <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE', marginBottom: 10 }}>{m.name}</div>
                  <Link href={`/products/${m.collection}/${m.slug}/`} className="btn" style={{ fontSize: 10, padding: '8px 16px', background: 'rgba(255,145,77,0.1)', color: '#FF914D', border: '1px solid rgba(255,145,77,0.25)', letterSpacing: '0.1em' }}>
                    Request Quote <i className="ti ti-arrow-right" style={{ fontSize: 11 }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#0D2118', padding: '80px 0', borderTop: '1px solid rgba(255,145,77,0.15)', borderBottom: '1px solid rgba(255,145,77,0.15)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '10+', label: 'Manufacturing partners\nacross İnegöl' },
              { num: '25+', label: 'Years of family expertise\nin furniture craftsmanship' },
              { num: 'OEM', label: 'Custom design & private\nlabel production ready' },
              { num: '500+', label: 'Trade partners and\nwholesale clients worldwide' },
            ].map((s, i) => (
              <div key={i} className={`reveal${i > 0 ? ` reveal-d${i}` : ''} text-center lg:text-left`} style={{ padding: '0 24px', borderRight: i < 3 ? '1px solid rgba(254,254,254,0.08)' : 'none' }}>
                <div className="stat-num">{s.num}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(254,254,254,0.5)', marginTop: 6, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: '#F5F0E8', padding: '100px 0', overflow: 'hidden' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal" style={{ position: 'relative' }}>
              <img src="/images/luxury/angel-pro-dining/pouf-luxury-angel-pro-dining-01.jpg" alt="Pouf luxury furniture manufacturing in Turkey" style={{ width: '100%', display: 'block', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }} />
              <div style={{ position: 'absolute', bottom: -30, right: -20, width: 200, boxShadow: '0 20px 48px rgba(0,0,0,0.25)', border: '4px solid #F5F0E8' }}>
                <img src="/images/modern/alfeca/pouf-modern-alfeca-02.jpg" alt="Pouf contemporary collection detail" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', top: 30, right: -10, background: '#1C3A2E', color: '#FEFEFE', padding: '18px 22px', boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.45)', marginBottom: 6 }}>Family Legacy Since</div>
                <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D' }}>2000</div>
              </div>
            </div>
            <div style={{ paddingBottom: 30 }}>
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 16 }}>Who we are</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,60px)', color: '#1C3A2E', marginBottom: 28 }}>A Trusted<br />Manufacturing<br />Partner</h2>
              <p className="reveal reveal-d2" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 20 }}>
                Pouf is a new brand rooted in İnegöl, Turkey — the heartland of premium furniture manufacturing. Built on 25 years of family expertise in the industry, we are the new generation driving a shift toward innovation while honouring the craftsmanship and quality standards our family has upheld for decades.
              </p>
              <p className="reveal reveal-d3" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 20 }}>
                Collaborating with over 10 trusted manufacturers in İnegöl and operating our own production line, we blend tradition with modern design to deliver durable, stylish, and functional furniture — with no middlemen, competitive wholesale pricing, and uncompromising quality control at every stage.
              </p>
              <p className="reveal reveal-d4" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 40 }}>
                From MOQ-friendly first orders to full container export programmes, we support importers, distributors, and large-scale retailers with flexible trade terms, OEM capability, and dedicated account management. Let's build the future of furniture together.
              </p>
              <div className="flex flex-wrap gap-4 reveal">
                <Link href="/collection" className="btn btn-dark" style={{ padding: '15px 34px' }}>View Catalogue <i className="ti ti-arrow-right" /></Link>
                <Link href="#contact" className="btn btn-outline-dark" style={{ padding: '13px 32px' }}>Contact Sales</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY POUF */}
      <section style={{ background: '#1C3A2E', padding: '100px 0' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Why trade partners choose us</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,64px)', color: '#FEFEFE' }}>Built for<br />Global Trade</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {[
              { icon: 'ti-truck', title: 'Global Logistics', body: 'Full container and LCL export experience to Europe, the Middle East, North Africa, and beyond. FOB, CIF, and DDP terms available.', pad: '40px 36px 40px 0', border: true },
              { icon: 'ti-shield-check', title: '2-Year Guarantee', body: 'Every piece carries a comprehensive 2-year structural warranty. We stand behind our manufacturing quality with full after-sales support.', pad: '40px 36px', border: true },
              { icon: 'ti-adjustments-horizontal', title: 'OEM & Custom', body: 'Private label manufacturing, custom colourways, material substitutions, and bespoke model development available for qualifying partners.', pad: '40px 0 40px 36px', border: false },
            ].map((f, i) => (
              <div key={i} className={`feature-row reveal${i > 0 ? ` reveal-d${i}` : ''}`} style={{ padding: f.pad, ...(f.border ? { borderRight: '1px solid rgba(254,254,254,0.08)' } : {}) }}>
                <div style={{ width: 52, height: 52, background: 'rgba(255,145,77,0.12)', border: '1px solid rgba(255,145,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <i className={`ti ${f.icon}`} style={{ fontSize: 22, color: '#FF914D' }} />
                </div>
                <h4 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE', marginBottom: 10 }}>{f.title}</h4>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.7, color: 'rgba(254,254,254,0.5)' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: '#0D2118', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="orb pulse-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,145,77,0.06) 0%,transparent 70%)', top: -200, right: -200 }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Trade partner feedback</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,64px)', color: '#FEFEFE' }}>Trusted by<br />Importers Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { initial: 'J', name: 'James H.', role: 'Director, furniture importer — UK', quote: 'Pouf has been our exclusive Turkish supplier for three years. Production quality is consistent, lead times are reliable, and our margins are strong. An excellent manufacturing partner.', featured: false },
              { initial: 'K', name: 'Khalid R.', role: 'CEO, wholesale distributor — UAE', quote: 'The Lagos and Bentley collections sell through our showrooms faster than anything else we stock. Pouf\'s quality-to-cost ratio is unmatched among our Turkish suppliers.', featured: true },
              { initial: 'M', name: 'Marco F.', role: 'Procurement director — Italy', quote: 'We placed our first trial order of 40 pieces and the quality exceeded expectations. We have since committed to three full containers annually. A trustworthy long-term partner.', featured: false },
            ].map((t, i) => (
              <div key={i} className={`testi-card reveal${i > 0 ? ` reveal-d${i}` : ''}`} style={{ padding: 36, ...(t.featured ? { borderColor: 'rgba(255,145,77,0.2)', background: 'rgba(255,145,77,0.04)' } : {}) }}>
                <div style={{ marginBottom: 20, display: 'flex', gap: 2 }}>
                  {[...Array(5)].map((_, j) => <i key={j} className="ti ti-star-filled" style={{ color: '#FF914D', fontSize: 13 }} />)}
                </div>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, lineHeight: 1.75, color: 'rgba(254,254,254,0.75)', marginBottom: 28, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid rgba(254,254,254,0.08)', paddingTop: 20 }}>
                  <div style={{ width: 42, height: 42, background: '#2A4A3A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 15, fontWeight: 800, color: '#FF914D' }}>{t.initial}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 15, fontWeight: 700, color: '#FEFEFE' }}>{t.name}</div>
                    <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.35)', marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: '#F5F0E8', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)', opacity: 0.04, pointerEvents: 'none' }}>
          <img src="/brand_assets/main_logo.png" alt="" style={{ height: 400, width: 'auto' }} aria-hidden="true" />
        </div>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 16 }}>Start a conversation</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,64px)', color: '#1C3A2E', marginBottom: 24 }}>Request a<br />Trade Quote</h2>
              <p className="reveal reveal-d2" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 36, maxWidth: 420 }}>
                Fill in the form and our export team will respond within one business day with pricing, lead times, and available trade terms for your market.
              </p>
              <div className="flex flex-col gap-5 reveal reveal-d3">
                {[
                  { icon: 'ti-mail', label: 'Email', content: (
                    <>
                      <a href="mailto:akif@pouffurnitures.com" style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)', textDecoration: 'none', display: 'block' }}>akif@pouffurnitures.com</a>
                      <a href="mailto:ziada.uzer@pouffurnitures.com" style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)', textDecoration: 'none', display: 'block' }}>ziada.uzer@pouffurnitures.com</a>
                    </>
                  )},
                  { icon: 'ti-brand-whatsapp', label: 'WhatsApp', content: (
                    <a href="https://wa.me/905432455503" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)', textDecoration: 'none' }}>+90 543 245 5503</a>
                  )},
                  { icon: 'ti-map-pin', label: 'Showroom', content: (
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)' }}>İnegöl, Turkey — by appointment</div>
                  )},
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 42, height: 42, background: '#1C3A2E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`ti ${item.icon}`} style={{ fontSize: 18, color: '#FF914D' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 14, fontWeight: 700, color: '#1C3A2E', marginBottom: 2 }}>{item.label}</div>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-d1" style={{ background: '#FEFEFE', padding: 40, boxShadow: '0 32px 64px rgba(0,0,0,0.1)' }}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>First Name</label>
                    <input name="firstName" type="text" placeholder="Jane" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Last Name</label>
                    <input name="lastName" type="text" placeholder="Smith" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                  </div>
                </div>
                <div className="mb-4">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Company &amp; Country</label>
                  <input name="company" type="text" placeholder="Acme Furniture, United Kingdom" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                </div>
                <div className="mb-4">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Business Email</label>
                  <input name="email" type="email" placeholder="jane@company.com" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                </div>
                <div className="mb-4">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Collection of Interest</label>
                  <select name="collection" className="form-select" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }}>
                    <option value="">Select a collection…</option>
                    <option>Luxury Collection</option>
                    <option>Contemporary Collection</option>
                    <option>Both Collections</option>
                    <option>Custom / OEM enquiry</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your requirements — models of interest, approximate quantities, destination market…" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E', resize: 'vertical' }} />
                </div>
                {formError && (
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: '#c0392b', marginBottom: 12 }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', padding: 16 }} disabled={formSent || formLoading}>
                  {formSent
                    ? <><i className="ti ti-check" /> Enquiry Sent — We'll be in touch within 24h</>
                    : formLoading
                    ? <><i className="ti ti-loader-2" /> Sending…</>
                    : <>Send Enquiry <i className="ti ti-arrow-right" /></>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
