import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const SITE_URL = 'https://www.pouffurnitures.com'

const heroSlidesTR = [
  { img: '/images/luxury/bentley/pouf-luxury-bentley-01.jpg', name: 'Bentley', label: 'Lüks Koleksiyon', collection: 'luxury', slug: 'bentley' },
  { img: '/images/luxury/angel-pro/pouf-luxury-angel-pro-01.jpg', name: 'Angel Pro', label: 'Lüks Koleksiyon', collection: 'luxury', slug: 'angel-pro' },
  { img: '/images/modern/asya/pouf-modern-asya-02.jpg', name: 'Asya', label: 'Çağdaş', collection: 'modern', slug: 'asya' },
  { img: '/images/modern/maveron/pouf-modern-maveron-02.jpg', name: 'Maveron', label: 'Çağdaş', collection: 'modern', slug: 'maveron' },
]

export default function HomeTR() {
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
    const t = setInterval(() => goSlide((heroIdxRef.current + 1) % heroSlidesTR.length), 4500)
    return () => clearInterval(t)
  }, [])

  function heroTouchStart(e) { heroTouchX.current = e.touches[0].clientX }
  function heroTouchEnd(e) {
    if (heroTouchX.current === null) return
    const delta = e.changedTouches[0].clientX - heroTouchX.current
    heroTouchX.current = null
    if (Math.abs(delta) < 40) return
    goSlide(delta < 0
      ? (heroIdxRef.current + 1) % heroSlidesTR.length
      : (heroIdxRef.current - 1 + heroSlidesTR.length) % heroSlidesTR.length)
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
    'Premium Türk Üreticisi', 'İnegöl, Türkiye Kökenli', 'B2B Toptan Ticaret',
    'OEM ve Özel Sipariş Kabul', '2 Yıl Kalite Garantisi', 'Esnek MOQ İhracat Koşulları',
  ]

  return (
    <>
      <Head>
        <title>Pouf Furniture — Premium Türk Mobilya Üreticisi &amp; B2B İhracatçı</title>
        <meta name="description" content="Pouf, İnegöl, Türkiye merkezli premium bir B2B mobilya üreticisi ve ihracatçısıdır. 25 yıllık aile deneyimiyle inşa edilmiş Pouf; toptan satıcılara ve dünya genelindeki ticaret ortaklarına lüks ve çağdaş mobilya koleksiyonları sunmaktadır." />
        <meta httpEquiv="content-language" content="tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Pouf Furniture — Premium Türk Mobilya Üreticisi & B2B İhracatçı" />
        <meta property="og:description" content="İnegöl, Türkiye merkezli B2B mobilya üreticisi ve ihracatçısı. Lüks ve Çağdaş koleksiyonlar. OEM, özel sipariş ve dünya genelinde toptan ihracat." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/tr/`} />
        <link rel="canonical" href={`${SITE_URL}/tr/`} />
        <meta property="og:image" content={`${SITE_URL}/images/luxury/lagos/pouf-luxury-lagos-01.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/images/luxury/lagos/pouf-luxury-lagos-01.jpg`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/tr/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav activePage="home" locale="tr" />

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: '#1C3A2E', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 60 }}>
        <div className="orb pulse-glow" style={{ width: 700, height: 700, background: 'radial-gradient(circle,rgba(255,145,77,0.1) 0%,transparent 70%)', top: -200, right: -100 }} />
        <div className="orb pulse-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(0,70,173,0.06) 0%,transparent 70%)', top: '30%', left: '35%', animationDelay: '2s' }} />
        <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontFamily: "'League Spartan',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.15)', whiteSpace: 'nowrap' }} className="hidden lg:block">
          Türk Üretici &amp; İhracatçı &nbsp;·&nbsp; Est. 2000
        </div>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <div>
              <div className="chip chip-orange mb-8">
                <i className="ti ti-world" style={{ fontSize: 10 }} />
                Küresel Mobilya İhracatçısı
              </div>
              <h1 className="display-xl mb-8" style={{ color: '#FEFEFE' }}>
                Türkiye'de<br />Üretildi,<br />Dünyaya<br /><em style={{ color: '#FF914D', fontStyle: 'italic' }}>Satıldı.</em>
              </h1>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.7, color: 'rgba(254,254,254,0.6)', maxWidth: 440, marginBottom: 40 }}>
                Pouf, İnegöl merkezli premium bir Türk mobilya üreticisi ve B2B ihracatçısıdır. 25 yıllık aile deneyimiyle inşa edilen Pouf; toptan satıcılara, perakendecilere ve dünya genelindeki ticaret ortaklarına lüks ve çağdaş mobilya koleksiyonları sunar.
              </p>
              <div className="flex flex-wrap gap-4 mb-14">
                <Link href="/tr/collection" className="btn btn-orange" style={{ fontSize: 13, padding: '16px 38px' }}>
                  Kataloğu İncele <i className="ti ti-arrow-right" />
                </Link>
                <Link href="#contact" className="btn btn-outline-white" style={{ fontSize: 13, padding: '14px 36px' }}>
                  Teklif İste
                </Link>
              </div>
              <div className="flex items-center gap-8" style={{ borderTop: '1px solid rgba(254,254,254,0.1)', paddingTop: 28 }}>
                <div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D', lineHeight: 1 }}>10+</div>
                  <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.4)', marginTop: 4 }}>İnegöl İş Ortağı</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'rgba(254,254,254,0.12)' }} />
                <div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D', lineHeight: 1 }}>25+</div>
                  <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.4)', marginTop: 4 }}>Yıllık Miras</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'rgba(254,254,254,0.12)' }} />
                <div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D', lineHeight: 1 }}>100%</div>
                  <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.4)', marginTop: 4 }}>Türk Yapımı</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Desktop: accordion expand gallery */}
              <div className="hidden lg:flex" style={{ gap: 6, height: 540 }}>
                {heroSlidesTR.map((slide, i) => (
                  <a
                    key={slide.slug}
                    href={`/tr/products/${slide.collection}/${slide.slug}`}
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
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,33,24,0.92) 0%, rgba(13,33,24,0.25) 50%, transparent 100%)' }} />
                    <div style={{
                      position: 'absolute', bottom: 24, left: 22, right: 12, pointerEvents: 'none',
                      opacity: i === heroIdx ? 1 : 0,
                      transform: i === heroIdx ? 'translateY(0)' : 'translateY(12px)',
                      transition: 'opacity 0.35s ease 0.18s, transform 0.35s ease 0.18s',
                    }}>
                      <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 5 }}>{slide.label}</div>
                      <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE', marginBottom: 10 }}>{slide.name}</div>
                      <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FF914D', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Detayı Gör <i className="ti ti-arrow-right" style={{ fontSize: 10 }} />
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
                      opacity: i === heroIdx ? 0 : 1, transition: 'opacity 0.25s ease',
                    }}>
                      <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', writingMode: 'vertical-rl' }}>{slide.name}</span>
                    </div>
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
                  {heroSlidesTR.map((slide, i) => (
                    <img key={slide.slug} src={slide.img} alt={`Pouf ${slide.name}`}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.5s ease', zIndex: i === heroIdx ? 2 : 1 }}
                    />
                  ))}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,33,24,0.8) 0%, transparent 55%)', zIndex: 3 }} />
                  <div style={{ position: 'absolute', top: 20, right: 0, background: '#FF914D', color: '#000', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 8px 24px rgba(255,145,77,0.4)', zIndex: 4 }}>
                    <i className="ti ti-world" style={{ fontSize: 14 }} />
                    <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: '0.04em' }}>İnegöl Yapımı</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 5, alignItems: 'center', zIndex: 4 }}>
                    {heroSlidesTR.map((_, i) => (
                      <button key={i} onClick={() => goSlide(i)} aria-label={`Slayt ${i + 1}`}
                        style={{ width: i === heroIdx ? 22 : 6, height: 6, background: i === heroIdx ? '#FF914D' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', borderRadius: 3, padding: 0, transition: 'width 0.35s ease, background 0.35s ease' }}
                      />
                    ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: 20, left: 16, zIndex: 4 }}>
                    <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 3 }}>{heroSlidesTR[heroIdx].label}</div>
                    <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE' }}>{heroSlidesTR[heroIdx].name}</div>
                  </div>
                </div>
              </div>

              <div className="scroll-bounce hidden lg:flex" style={{ position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.22)' }}>Kaydır</div>
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
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Ürün hatlarımız</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#FEFEFE' }}>İki Farklı<br />Koleksiyon</h2>
            </div>
            <Link href="/tr/collection" className="btn-ghost reveal reveal-d2" style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
              Tam Kataloğu Görüntüle <i className="ti ti-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Link href="/tr/collection#luxury" className="coll-card reveal" style={{ height: 520 }}>
              <img src="/images/luxury/lagos/pouf-luxury-lagos-01.jpg" alt="Pouf Lüks Koleksiyon — altın aksan detaylı Türk mobilyası" />
              <div className="coll-overlay" />
              <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.5)', marginBottom: 10 }}>12 Model</div>
                <h3 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#FEFEFE', marginBottom: 10, lineHeight: 1.05 }}>Lüks<br />Koleksiyon</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.6)', marginBottom: 16, maxWidth: 340 }}>El işçiliği altın aksan detaylı gösterişli barok ve art deco takımlar. Premium showroom'lar ve üst düzey konut projeleri için tasarlandı.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="eyebrow" style={{ color: '#FF914D' }}>Koleksiyonu Keşfet</span>
                  <i className="ti ti-arrow-right coll-arrow" style={{ color: '#FF914D', fontSize: 14 }} />
                </div>
              </div>
            </Link>
            <Link href="/tr/collection#modern" className="coll-card reveal reveal-d1" style={{ height: 520 }}>
              <img src="/images/modern/asya/pouf-modern-asya-02.jpg" alt="Pouf Çağdaş Koleksiyon — minimalist Türk mobilyası" />
              <div className="coll-overlay" />
              <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.5)', marginBottom: 10 }}>10 Model</div>
                <h3 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#FEFEFE', marginBottom: 10, lineHeight: 1.05 }}>Çağdaş</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.6)', marginBottom: 16, maxWidth: 340 }}>Temiz hatlar, premium bouclé ve deri döşeme, doğal meşe tabanlar. Çağdaş perakende, konaklama ve kurumsal iç mekanlar için uygun.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="eyebrow" style={{ color: '#FF914D' }}>Koleksiyonu Keşfet</span>
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
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Ticari alıcılar için seçkiler</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#1C3A2E' }}>Öne Çıkan Modeller</h2>
            </div>
            <Link href="/tr/collection" className="btn reveal reveal-d2 btn-dark" style={{ alignSelf: 'flex-start' }}>
              Tüm Modelleri Gör <i className="ti ti-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { collection: 'luxury', slug: 'bentley', name: 'Bentley', label: 'Lüks · Koltuk Takımı', img: '/images/luxury/bentley/pouf-luxury-bentley-01.jpg', alt: 'Pouf Lüks Bentley Koltuk Takımı' },
              { collection: 'luxury', slug: 'angel-pro', name: 'Angel Pro', label: 'Lüks · Koltuk Takımı', img: '/images/luxury/angel-pro/pouf-luxury-angel-pro-01.jpg', alt: 'Pouf Lüks Angel Pro Koltuk Takımı' },
              { collection: 'modern', slug: 'asya', name: 'Asya', label: 'Çağdaş · Koltuk', img: '/images/modern/asya/pouf-modern-asya-02.jpg', alt: 'Pouf Çağdaş Asya Koltuk' },
              { collection: 'modern', slug: 'maveron', name: 'Maveron', label: 'Çağdaş · Koltuk', img: '/images/modern/maveron/pouf-modern-maveron-02.jpg', alt: 'Pouf Çağdaş Maveron Koltuk' },
            ].map((m, i) => (
              <div key={m.slug} className={`model-card reveal${i > 0 ? ` reveal-d${i}` : ''}`}>
                <div className="model-img-wrap">
                  <img src={m.img} alt={m.alt} />
                  <div className="model-overlay" />
                  <Link href={`/tr/collection#${m.collection}`} className="model-view-btn btn btn-orange-sm" style={{ pointerEvents: 'none' }}>Katalogda Görüntüle</Link>
                </div>
                <div style={{ padding: '18px 18px 22px' }}>
                  <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', color: '#FEFEFE', marginBottom: 10 }}>{m.name}</div>
                  <Link href={`/tr/products/${m.collection}/${m.slug}`} className="btn" style={{ fontSize: 10, padding: '8px 16px', background: 'rgba(255,145,77,0.1)', color: '#FF914D', border: '1px solid rgba(255,145,77,0.25)', letterSpacing: '0.1em' }}>
                    Teklif İste <i className="ti ti-arrow-right" style={{ fontSize: 11 }} />
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
              { num: '10+', label: 'İnegöl genelinde\nüretim ortağı' },
              { num: '25+', label: 'Yıllık aile deneyimi\nve mobilya ustalığı' },
              { num: 'OEM', label: 'Özel tasarım ve\nözel marka üretimi' },
              { num: '500+', label: 'Dünya genelinde ticaret\nortağı ve toptan müşteri' },
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
              <img src="/images/luxury/angel-pro-dining/pouf-luxury-angel-pro-dining-01.jpg" alt="Türkiye'de Pouf lüks mobilya üretimi" style={{ width: '100%', display: 'block', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }} />
              <div style={{ position: 'absolute', bottom: -30, right: -20, width: 200, boxShadow: '0 20px 48px rgba(0,0,0,0.25)', border: '4px solid #F5F0E8' }}>
                <img src="/images/modern/alfeca/pouf-modern-alfeca-02.jpg" alt="Pouf çağdaş koleksiyon detay" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', top: 30, right: -10, background: '#1C3A2E', color: '#FEFEFE', padding: '18px 22px', boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}>
                <div className="eyebrow" style={{ color: 'rgba(254,254,254,0.45)', marginBottom: 6 }}>Aile Mirası</div>
                <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', color: '#FF914D' }}>2000</div>
              </div>
            </div>
            <div style={{ paddingBottom: 30 }}>
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 16 }}>Biz kimiz</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,60px)', color: '#1C3A2E', marginBottom: 28 }}>Güvenilir Bir<br />Üretim<br />Ortağı</h2>
              <p className="reveal reveal-d2" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 20 }}>
                Pouf, premium mobilya üretiminin kalbi olan İnegöl, Türkiye'de kurulmuş yeni bir markadır. 25 yıllık aile deneyimine dayanan Pouf, geçmişin ustalık mirasını ve kalite standartlarını korurken inovasyona öncülük eden yeni nesli temsil etmektedir.
              </p>
              <p className="reveal reveal-d3" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 20 }}>
                İnegöl'de 10'dan fazla güvenilir üretici ile işbirliği yaparak ve kendi üretim hattımızı işleterek, geleneği modern tasarımla harmanlıyor; aracı olmadan, rekabetçi toptan fiyatlarla ve her aşamada titiz kalite kontrolüyle dayanıklı, şık ve işlevsel mobilyalar sunuyoruz.
              </p>
              <p className="reveal reveal-d4" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 40 }}>
                MOQ dostu ilk siparişlerden tam konteyner ihracat programlarına kadar; ithalatçılara, distribütörlere ve büyük ölçekli perakendecilere esnek ticaret koşulları, OEM kapasitesi ve özel hesap yönetimi ile destek sağlıyoruz. Birlikte mobilyanın geleceğini inşa edelim.
              </p>
              <div className="flex flex-wrap gap-4 reveal">
                <Link href="/tr/collection" className="btn btn-dark" style={{ padding: '15px 34px' }}>Kataloğu İncele <i className="ti ti-arrow-right" /></Link>
                <Link href="#contact" className="btn btn-outline-dark" style={{ padding: '13px 32px' }}>Satış İletişim</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY POUF */}
      <section style={{ background: '#1C3A2E', padding: '100px 0' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Ticaret ortakları neden bizi seçiyor</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,64px)', color: '#FEFEFE' }}>Küresel Ticarete<br />Hazır</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {[
              { icon: 'ti-truck', title: 'Küresel Lojistik', body: 'Avrupa, Orta Doğu, Kuzey Afrika ve ötesine tam konteyner ve parsiyel ihracat deneyimi. FOB, CIF ve DDP koşulları mevcuttur.', pad: '40px 36px 40px 0', border: true },
              { icon: 'ti-shield-check', title: '2 Yıl Garanti', body: 'Her ürün kapsamlı 2 yıllık yapısal garanti ile teslim edilir. Üretim kalitemizin arkasındayız; tam satış sonrası destek sağlıyoruz.', pad: '40px 36px', border: true },
              { icon: 'ti-adjustments-horizontal', title: 'OEM ve Özel Üretim', body: 'Nitelikli ortaklar için özel marka üretimi, özel renkler, malzeme alternatifleri ve özel model geliştirme hizmetleri sunuyoruz.', pad: '40px 0 40px 36px', border: false },
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
            <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 14 }}>Ticaret ortağı görüşleri</div>
            <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,64px)', color: '#FEFEFE' }}>Dünya Genelinde<br />İthalatçıların Güveni</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { initial: 'J', name: 'James H.', role: 'Direktör, mobilya ithalatçısı — İngiltere', quote: 'Pouf has been our exclusive Turkish supplier for three years. Production quality is consistent, lead times are reliable, and our margins are strong. An excellent manufacturing partner.', featured: false },
              { initial: 'K', name: 'Khalid R.', role: 'CEO, toptan distribütör — BAE', quote: "The Lagos and Bentley collections sell through our showrooms faster than anything else we stock. Pouf's quality-to-cost ratio is unmatched among our Turkish suppliers.", featured: true },
              { initial: 'M', name: 'Marco F.', role: 'Satın alma direktörü — İtalya', quote: 'We placed our first trial order of 40 pieces and the quality exceeded expectations. We have since committed to three full containers annually. A trustworthy long-term partner.', featured: false },
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
              <div className="eyebrow reveal" style={{ color: '#FF914D', marginBottom: 16 }}>İletişime geçin</div>
              <h2 className="sec-heading reveal reveal-d1" style={{ fontSize: 'clamp(36px,5vw,64px)', color: '#1C3A2E', marginBottom: 24 }}>Ticari Teklif<br />İsteyin</h2>
              <p className="reveal reveal-d2" style={{ fontFamily: "'Jost',sans-serif", fontSize: 17, lineHeight: 1.75, color: 'rgba(28,58,46,0.7)', marginBottom: 36, maxWidth: 420 }}>
                Formu doldurun; ihracat ekibimiz bir iş günü içinde fiyatlandırma, teslim süreleri ve pazarınız için uygun ticaret koşullarıyla size dönecektir.
              </p>
              <div className="flex flex-col gap-5 reveal reveal-d3">
                {[
                  { icon: 'ti-mail', label: 'E-posta', content: (
                    <>
                      <a href="mailto:akif@pouffurnitures.com" style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)', textDecoration: 'none', display: 'block' }}>akif@pouffurnitures.com</a>
                      <a href="mailto:ziada.uzer@pouffurnitures.com" style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)', textDecoration: 'none', display: 'block' }}>ziada.uzer@pouffurnitures.com</a>
                    </>
                  )},
                  { icon: 'ti-brand-whatsapp', label: 'WhatsApp', content: (
                    <a href="https://wa.me/905432455503" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)', textDecoration: 'none' }}>+90 543 245 5503</a>
                  )},
                  { icon: 'ti-map-pin', label: 'Showroom', content: (
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: 'rgba(28,58,46,0.7)' }}>İnegöl, Türkiye — randevu ile</div>
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
                    <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Ad</label>
                    <input name="firstName" type="text" placeholder="Ahmet" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Soyad</label>
                    <input name="lastName" type="text" placeholder="Yılmaz" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                  </div>
                </div>
                <div className="mb-4">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Şirket &amp; Ülke</label>
                  <input name="company" type="text" placeholder="ABC Mobilya, Türkiye" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                </div>
                <div className="mb-4">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>İş E-postası</label>
                  <input name="email" type="email" placeholder="ahmet@firma.com" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }} required />
                </div>
                <div className="mb-4">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>İlgilendiğiniz Koleksiyon</label>
                  <select name="collection" className="form-select" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E' }}>
                    <option value="">Bir koleksiyon seçin…</option>
                    <option>Lüks Koleksiyon</option>
                    <option>Çağdaş Koleksiyon</option>
                    <option>Her İki Koleksiyon</option>
                    <option>Özel / OEM Talebi</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(28,58,46,0.6)', display: 'block', marginBottom: 6 }}>Mesaj</label>
                  <textarea name="message" rows={4} placeholder="Gereksinimlerinizi belirtin — ilgilendiğiniz modeller, tahmini miktarlar, hedef pazar…" className="form-input" style={{ background: 'rgba(28,58,46,0.04)', border: '1px solid rgba(28,58,46,0.15)', color: '#1C3A2E', resize: 'vertical' }} />
                </div>
                {formError && (
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: '#c0392b', marginBottom: 12 }}>
                    Bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan e-posta gönderin.
                  </p>
                )}
                <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', padding: 16 }} disabled={formSent || formLoading}>
                  {formSent
                    ? <><i className="ti ti-check" /> Talebiniz İletildi — 24 saat içinde dönüş yapacağız</>
                    : formLoading
                    ? <><i className="ti ti-loader-2" /> Gönderiliyor…</>
                    : <>Teklif Gönder <i className="ti ti-arrow-right" /></>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer locale="tr" />
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
