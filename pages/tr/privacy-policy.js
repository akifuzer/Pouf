import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function PrivacyPolicyTR() {
  return (
    <>
      <Head>
        <title>Gizlilik Politikası — Pouf Furniture</title>
        <meta name="description" content="Pouf Furniture gizlilik politikası. Kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu öğrenin." />
        <meta httpEquiv="content-language" content="tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.pouffurnitures.com/tr/privacy-policy/" />
        <link rel="alternate" hrefLang="en" href="https://www.pouffurnitures.com/privacy-policy/" />
        <link rel="alternate" hrefLang="tr" href="https://www.pouffurnitures.com/tr/privacy-policy/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pouffurnitures.com/privacy-policy/" />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav alwaysDark locale="tr" />

      {/* PAGE HERO */}
      <section style={{ background: '#0D2118', padding: '140px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb pulse-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,145,77,0.1) 0%,transparent 70%)', top: -200, right: -150 }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Link href="/tr" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none' }}>Ana Sayfa</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 11, color: 'rgba(254,254,254,0.2)' }} />
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>Gizlilik Politikası</span>
          </div>
          <div className="chip chip-orange" style={{ marginBottom: 20 }}>Yasal</div>
          <h1 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FEFEFE', lineHeight: 1.05, marginBottom: 16, marginTop: 0 }}>
            Gizlilik Politikası
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.4)', margin: 0 }}>Son Güncelleme: 13 Mayıs 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: '#F5F0E8', padding: '80px 0 120px' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ maxWidth: 760 }}>

            <Section num="01" title="Genel Bilgiler">
              <P>Pouf Furnitures olarak kişisel verilerinizin korunması bizim için önemlidir. Bu gizlilik politikası, web sitemiz aracılığıyla toplanan kişisel verilerinizi nasıl işlediğimize dair bilgi sunmaktadır.</P>
            </Section>

            <Section num="02" title="Veri Sorumlusu">
              <P>Veri sorumlusu:</P>
              <address style={{ fontStyle: 'normal', marginTop: 16, fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 2, color: 'rgba(0,0,0,0.75)' }}>
                <strong style={{ color: '#0D2118' }}>Pouf Furnitures</strong><br />
                Girne Mah Narlıdere Cad No:44 Maltepe<br />
                İstanbul, Türkiye<br />
                Telefon: <a href="tel:+905432455503" style={{ color: '#FF914D', textDecoration: 'none' }}>+90 543 245 55 03</a>
              </address>
            </Section>

            <Section num="03" title="Kişisel Verilerin Toplanması ve Saklanması">
              <SubSection label="a. Web Sitesini Ziyaret Ederken">
                <P>Web sitemizi ziyaret ettiğinizde aşağıdaki bilgiler otomatik olarak toplanır:</P>
                <UL items={['IP adresi', 'İstek tarih ve saati', 'Tarayıcı türü ve sürümü', 'İşletim sistemi']} />
                <P>Bu veriler, web sitemizin sorunsuz çalışmasını sağlamak ve istatistiksel amaçlar için kullanılmaktadır.</P>
              </SubSection>
              <SubSection label="b. İletişim Formu">
                <P>İletişim formumuzu kullandığınızda, sağladığınız veriler (örn. ad, e-posta adresi, mesaj) işlenmektedir. Bu veriler yalnızca talebinizi yanıtlamak amacıyla kullanılmaktadır.</P>
              </SubSection>
              <SubSection label="c. Çerezler">
                <P>Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler kullanmaktadır. Bazı çerezler web sitesinin işleyişi için zorunlu olup, diğerleri kullanıcı davranışlarını analiz etmek amacıyla kullanılmaktadır. Çerez tercihlerinizi tarayıcı ayarlarından düzenleyebilirsiniz.</P>
              </SubSection>
              <SubSection label="d. Analiz Araçları">
                <P>Kullanıcı davranışlarını anlamak ve web sitemizi optimize etmek amacıyla Google Analytics gibi analiz araçları kullanmaktayız. Bu araçlar anonimleştirilmiş veriler toplar.</P>
              </SubSection>
              <SubSection label="e. Sosyal Medya Eklentileri" last>
                <P>Web sitemiz Facebook, Instagram ve LinkedIn gibi sosyal medya platformlarının eklentilerini kullanmaktadır. Bu eklentiler, web sitemizi ziyaret ettiğinizde IP adresiniz gibi verileri toplayabilir. Veri işleme, ilgili platformun gizlilik politikalarına uygun şekilde gerçekleştirilmektedir.</P>
              </SubSection>
            </Section>

            <Section num="04" title="Üçüncü Taraflarla Veri Paylaşımı">
              <P>Kişisel verileriniz, yalnızca yasal zorunluluk bulunması veya açık rızanızın alınması durumunda üçüncü taraflarla paylaşılacaktır. Örnekler:</P>
              <UL items={['Web sitesi işletimi için hosting sağlayıcıları', 'Analiz araçları ve sosyal medya eklentisi sağlayıcıları']} />
            </Section>

            <Section num="05" title="Haklarınız">
              <P>Aşağıdaki haklara sahipsiniz:</P>
              <UL items={[
                'Saklanan verilerinize erişim',
                'Yanlış verilerin düzeltilmesi',
                'Yasal saklama yükümlülüğü bulunmaması koşuluyla verilerinizin silinmesi',
                'Veri işlemenin kısıtlanması',
                'Veri işlemeye itiraz',
              ]} />
              <P>Haklarınızı kullanmak için bizimle iletişime geçin: <a href="mailto:info@pouffurnitures.com" style={{ color: '#FF914D', textDecoration: 'none' }}>info@pouffurnitures.com</a></P>
            </Section>

            <Section num="06" title="Gizlilik Politikasındaki Değişiklikler">
              <P>Yasal veya teknik gereksinimlerdeki değişiklikleri yansıtmak amacıyla bu gizlilik politikasını güncelleme hakkımızı saklı tutarız.</P>
            </Section>

            <Section num="07" title="İletişim" last>
              <P>Bu gizlilik politikasına ilişkin sorularınız için bize ulaşabilirsiniz:</P>
              <address style={{ fontStyle: 'normal', marginTop: 16, fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 2, color: 'rgba(0,0,0,0.75)' }}>
                <strong style={{ color: '#0D2118' }}>Pouf Furnitures</strong><br />
                Girne Mah Narlıdere Cad No:44 Maltepe<br />
                İstanbul, Türkiye<br />
                Telefon: <a href="tel:+905432455503" style={{ color: '#FF914D', textDecoration: 'none' }}>+90 543 245 55 03</a><br />
                E-Posta: <a href="mailto:info@pouffurnitures.com" style={{ color: '#FF914D', textDecoration: 'none' }}>info@pouffurnitures.com</a>
              </address>
            </Section>

          </div>
        </div>
      </section>

      <Footer locale="tr" />
    </>
  )
}

function Section({ num, title, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 56, paddingBottom: last ? 0 : 56, borderBottom: last ? 'none' : '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
        <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: '#FF914D', flexShrink: 0 }}>{num}</span>
        <h2 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: '#0D2118', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function SubSection({ label, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 24 }}>
      <h3 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C3A2E', marginBottom: 10, marginTop: 0 }}>{label}</h3>
      {children}
    </div>
  )
}

function P({ children }) {
  return <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', marginTop: 0, marginBottom: 12 }}>{children}</p>
}

function UL({ items }) {
  return (
    <ul style={{ margin: '12px 0 16px 0', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
          <span style={{ color: '#FF914D', marginTop: 7, width: 5, height: 5, borderRadius: '50%', background: '#FF914D', flexShrink: 0, display: 'inline-block' }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
