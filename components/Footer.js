import Link from 'next/link'

export default function Footer({ locale = 'en' }) {
  const isTr = locale === 'tr'
  const p = isTr ? '/tr' : ''

  const labels = isTr ? {
    tagline: 'Premium Türk mobilya üreticisi ve B2B ihracatçısı, İnegöl kökenli. 25 yıllık aile uzmanlığı üzerine inşa edildi.',
    collectionsHeading: 'Koleksiyonlar',
    fullCatalogue: 'Tam Katalog',
    luxury: 'Lüks Koleksiyon',
    contemporary: 'Çağdaş',
    navigateHeading: 'Gezin',
    about: 'Pouf Hakkında',
    quote: 'Teklif İste',
    contactHeading: 'İletişim',
    copyright: '© 2025 Pouf Furniture. Tüm hakları saklıdır.',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
  } : {
    tagline: 'Premium Turkish furniture manufacturer and B2B exporter, rooted in İnegöl. Built on 25 years of family expertise.',
    collectionsHeading: 'Collections',
    fullCatalogue: 'Full Catalogue',
    luxury: 'Luxury Collection',
    contemporary: 'Contemporary',
    navigateHeading: 'Navigate',
    about: 'About Pouf',
    quote: 'Request a Quote',
    contactHeading: 'Contact',
    copyright: '© 2025 Pouf Furniture. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
  }

  return (
    <footer style={{ background: '#0D2118', padding: '80px 0 0' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-16" style={{ borderBottom: '1px solid rgba(254,254,254,0.08)' }}>

          {/* Brand */}
          <div>
            <img
              src="/brand_assets/main_logo.png"
              alt="Pouf Furniture"
              style={{ height: 38, width: 'auto', filter: 'invert(1)', mixBlendMode: 'screen', marginBottom: 20, display: 'block' }}
            />
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, lineHeight: 1.75, color: 'rgba(254,254,254,0.42)', marginBottom: 28 }}>
              {labels.tagline}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="https://www.instagram.com/pouffurniture/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram"><i className="ti ti-brand-instagram" /></a>
              <a href="https://www.facebook.com/pouffurnitures/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><i className="ti ti-brand-facebook" /></a>
              <a href="https://www.linkedin.com/company/pouffurnitures/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn"><i className="ti ti-brand-linkedin" /></a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 20 }}>{labels.collectionsHeading}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><Link href={p + '/collection'} className="footer-link">{labels.fullCatalogue}</Link></li>
              <li><Link href={p + '/collection#luxury'} className="footer-link">{labels.luxury}</Link></li>
              <li><Link href={p + '/collection#modern'} className="footer-link">{labels.contemporary}</Link></li>
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 20 }}>{labels.navigateHeading}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><Link href={p + '/#about'} className="footer-link">{labels.about}</Link></li>
              <li><Link href={p + '/#contact'} className="footer-link">{labels.quote}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow" style={{ color: '#FF914D', marginBottom: 20 }}>{labels.contactHeading}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className="ti ti-phone" style={{ fontSize: 14, color: '#FF914D', flexShrink: 0 }} />
                <a href="tel:+905432455503" style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FEFEFE'} onMouseLeave={e => e.target.style.color = 'rgba(254,254,254,0.45)'}>
                  +90 543 245 55 03
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className="ti ti-mail" style={{ fontSize: 14, color: '#FF914D', flexShrink: 0 }} />
                <a href="mailto:akif@pouffurnitures.com" style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.45)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#FEFEFE'} onMouseLeave={e => e.target.style.color = 'rgba(254,254,254,0.45)'}>
                  akif@pouffurnitures.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-7">
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: 'rgba(254,254,254,0.28)' }}>
            {labels.copyright}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href={p + '/privacy-policy'} className="footer-link" style={{ fontSize: 12 }}>{labels.privacy}</Link>
            <Link href={p + '/terms-and-conditions'} className="footer-link" style={{ fontSize: 12 }}>{labels.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
