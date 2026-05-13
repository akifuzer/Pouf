import { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { allProducts } from '../data/products'

export default function Nav({ activePage = 'home', alwaysDark = false, locale = 'en' }) {
  const navRef = useRef(null)
  const searchRef = useRef(null)
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (alwaysDark) return
    const el = navRef.current
    const handler = () => el.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [alwaysDark])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setQuery('')
  }, [router.asPath])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const isTr = locale === 'tr'
  const p = isTr ? '/tr' : ''

  const rawPath = router.asPath.split('?')[0]
  const altPath = isTr
    ? (rawPath.startsWith('/tr') ? rawPath.slice(3) || '/' : '/')
    : '/tr' + (rawPath === '/' ? '' : rawPath)

  const labels = isTr
    ? { home: 'Ana Sayfa', collections: 'Koleksiyonlar', about: 'Hakkımızda', contact: 'İletişim', quote: 'Teklif İste', searchPlaceholder: 'Ürün ara…', noResults: 'Sonuç bulunamadı' }
    : { home: 'Home', collections: 'Collections', about: 'About', contact: 'Contact', quote: 'Request a Quote', searchPlaceholder: 'Search products…', noResults: 'No results found' }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allProducts.filter(pr => {
      const name = pr.name.toLowerCase()
      const cat = (isTr ? pr.categoryTr || pr.category : pr.category).toLowerCase()
      const desc = (isTr ? pr.descTr || pr.desc : pr.desc).toLowerCase()
      const col = pr.collection.toLowerCase()
      return name.includes(q) || cat.includes(q) || desc.includes(q) || col.includes(q)
    }).slice(0, 6)
  }, [query, isTr])

  const navLinks = [
    { href: p + '/', label: labels.home, active: activePage === 'home' },
    { href: p + '/collection', label: labels.collections, active: activePage === 'collection' },
    { href: p + '/#about', label: labels.about },
    { href: p + '/#contact', label: labels.contact },
  ]

  return (
    <>
      <nav
        id="main-nav"
        ref={navRef}
        className={`w-full px-6 lg:px-12 py-5${alwaysDark ? ' always-dark' : ''}`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <Link href={p + '/'} className="flex-shrink-0">
            <img
              src="/brand_assets/main_logo.png"
              alt="Pouf Furniture"
              style={{ height: 34, width: 'auto', filter: 'invert(1)', mixBlendMode: 'screen' }}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className={`nav-link${l.active ? ' active' : ''}`}>{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="nav-icon-btn"
              aria-label="Search"
              onClick={() => { setSearchOpen(v => !v); setMenuOpen(false); setQuery('') }}
            >
              <i className={`ti ${searchOpen ? 'ti-x' : 'ti-search'}`} />
            </button>
            <Link
              href={altPath}
              className="nav-icon-btn"
              aria-label={isTr ? 'English version' : 'Türkçe sürüm'}
              style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', minWidth: 32, justifyContent: 'center' }}
            >
              {isTr ? 'EN' : 'TR'}
            </Link>
            <button
              className="nav-icon-btn lg:hidden"
              aria-label="Menu"
              onClick={() => { setMenuOpen(v => !v); setSearchOpen(false) }}
            >
              <i className={`ti ${menuOpen ? 'ti-x' : 'ti-menu-2'}`} />
            </button>
            <div className="hidden lg:block ml-2">
              <Link href={p + '/#contact'} className="btn btn-orange-sm">
                {labels.quote} <i className="ti ti-arrow-right" style={{ fontSize: 12 }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Search panel */}
        {searchOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'rgba(13,33,24,0.98)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            zIndex: 9999,
          }}>
            <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 24px' }}>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={labels.searchPlaceholder}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4,
                  padding: '12px 16px', color: '#FEFEFE',
                  fontFamily: "'Jost',sans-serif", fontSize: 15, outline: 'none',
                }}
              />
              {query.trim() && (
                <div style={{ marginTop: 8 }}>
                  {results.length === 0 ? (
                    <div style={{ padding: '16px 0', fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.4)' }}>
                      {labels.noResults}
                    </div>
                  ) : results.map(pr => (
                    <Link
                      key={pr.slug}
                      href={`${p}/products/${pr.collection}/${pr.slug}`}
                      onClick={() => { setSearchOpen(false); setQuery('') }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '10px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        textDecoration: 'none',
                      }}
                    >
                      <img
                        src={`/images/${pr.collection}/${pr.slug}/pouf-${pr.collection}-${pr.slug}-01.jpg`}
                        alt={pr.name}
                        style={{ width: 52, height: 40, objectFit: 'cover', flexShrink: 0, borderRadius: 2 }}
                      />
                      <div>
                        <div style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 14, fontWeight: 700, color: '#FEFEFE', letterSpacing: '-0.01em' }}>
                          {pr.name}
                        </div>
                        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: 'rgba(254,254,254,0.45)', marginTop: 2 }}>
                          {isTr ? pr.categoryTr || pr.category : pr.category}
                        </div>
                      </div>
                      <i className="ti ti-arrow-right" style={{ marginLeft: 'auto', fontSize: 13, color: '#FF914D' }} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu — full-screen overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(13,33,24,0.97)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
          }}
          onClick={() => setMenuOpen(false)}
        >
          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 24px' }}>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                width: 44, height: 44, background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)', borderRadius: 4,
                color: '#FEFEFE', fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <i className="ti ti-x" />
            </button>
          </div>

          {/* Nav links — stop propagation so tapping a link doesn't also fire the backdrop onClick */}
          <nav
            style={{ display: 'flex', flexDirection: 'column', padding: '24px 32px', gap: 0, flex: 1 }}
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'League Spartan',sans-serif",
                  fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
                  color: item.active ? '#FF914D' : 'rgba(254,254,254,0.85)',
                  textDecoration: 'none', padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'block',
                }}
              >
                {item.label}
              </Link>
            ))}

            <div style={{ marginTop: 36 }}>
              <Link
                href={p + '/#contact'}
                className="btn btn-orange"
                onClick={() => setMenuOpen(false)}
                style={{ padding: '16px 32px', justifyContent: 'center', width: '100%' }}
              >
                {labels.quote} <i className="ti ti-arrow-right" />
              </Link>
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
              <a href="https://wa.me/905432455503" target="_blank" rel="noopener noreferrer" className="nav-icon-btn" aria-label="WhatsApp">
                <i className="ti ti-brand-whatsapp" style={{ fontSize: 20 }} />
              </a>
              <Link href={altPath} className="nav-icon-btn" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>
                {isTr ? 'EN' : 'TR'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
