import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function TermsAndConditionsTR() {
  return (
    <>
      <Head>
        <title>Kullanım Koşulları — Pouf Furniture</title>
        <meta name="description" content="Pouf Furniture web sitesi kullanım koşulları. Kullanım politikalarımızı, fikri mülkiyet haklarımızı ve yasal bildirimlerimizi okuyun." />
        <meta httpEquiv="content-language" content="tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.pouffurnitures.com/tr/terms-and-conditions/" />
        <link rel="alternate" hrefLang="en" href="https://www.pouffurnitures.com/terms-and-conditions/" />
        <link rel="alternate" hrefLang="tr" href="https://www.pouffurnitures.com/tr/terms-and-conditions/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pouffurnitures.com/terms-and-conditions/" />
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
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>Kullanım Koşulları</span>
          </div>
          <div className="chip chip-orange" style={{ marginBottom: 20 }}>Yasal</div>
          <h1 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FEFEFE', lineHeight: 1.05, marginBottom: 16, marginTop: 0 }}>
            Kullanım Koşulları
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.4)', margin: 0 }}>Son Güncelleme: 13 Mayıs 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: '#F5F0E8', padding: '80px 0 120px' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ maxWidth: 760 }}>

            <Section num="01" title="Genel">
              <P>Bu web sitesine erişerek ve kullanarak bu Kullanım Koşullarını kabul etmiş ve bunlara uymayı taahhüt etmiş olursunuz. Bu koşulların herhangi bir bölümüne katılmıyorsanız lütfen web sitemizi kullanmayı bırakın.</P>
              <P>Bu web sitesi, Girne Mah Narlıdere Cad No:44 Maltepe, İstanbul, Türkiye adresinde faaliyet gösteren <strong>Pouf Furnitures</strong> tarafından işletilmektedir. Sorularınız için <a href="mailto:info@pouffurnitures.com" style={{ color: '#FF914D', textDecoration: 'none' }}>info@pouffurnitures.com</a> adresinden bize ulaşabilirsiniz.</P>
            </Section>

            <Section num="02" title="Fikri Mülkiyet">
              <P>Bu web sitesindeki tüm içerikler — metinler, görseller, grafikler, logolar ve diğer materyaller dahil — Pouf Furnitures'ın mülkiyetinde olup geçerli telif hakkı ve fikri mülkiyet yasaları kapsamında korunmaktadır.</P>
              <P>Önceden yazılı iznimiz alınmadan bu web sitesindeki hiçbir içeriği çoğaltamaz, dağıtamaz, değiştiremez veya yeniden yayınlayamazsınız.</P>
            </Section>

            <Section num="03" title="Kabul Edilebilir Kullanım">
              <P>Web sitemizi yalnızca yasal amaçlarla ve başkalarının haklarını ihlal etmeyecek şekilde kullanmayı kabul ediyorsunuz. Aşağıdakileri yapmamalısınız:</P>
              <UL items={[
                'Web sitesini yürürlükteki yerel, ulusal veya uluslararası yasa veya düzenlemeleri ihlal edecek şekilde kullanmak',
                'İstenmeyen veya yetkisiz reklam ya da tanıtım materyali göndermek',
                'Web sitesinin herhangi bir bölümüne veya ilgili sistemlerine yetkisiz erişim sağlamaya çalışmak',
                'Herhangi bir kişinin web sitesini kullanmasını veya bundan yararlanmasını kısıtlayan ya da engelleyen davranışlarda bulunmak',
              ]} />
            </Section>

            <Section num="04" title="Sorumluluk Reddi">
              <P>Bu web sitesindeki bilgiler yalnızca genel bilgi amaçlı sunulmaktadır. İçeriklerin doğru ve güncel tutulması için çaba göstermekle birlikte, sitedeki herhangi bir bilginin eksiksizliği, doğruluğu veya güvenilirliği konusunda açık ya da zımni hiçbir beyanda bulunmamaktayız.</P>
              <P>Bu web sitesini veya üzerindeki herhangi bir içeriği kullanmanızdan ya da kullanamamanızdan doğrudan veya dolaylı olarak kaynaklanan herhangi bir kayıp veya zarardan sorumlu tutulamayız.</P>
            </Section>

            <Section num="05" title="Üçüncü Taraf Bağlantıları">
              <P>Web sitemiz harici web sitelerine bağlantılar içerebilir. Bu bağlantılar yalnızca kolaylık sağlamak amacıyla sunulmaktadır. Söz konusu sitelerin içeriği üzerinde hiçbir kontrolümüz bulunmamakta olup, bu sitelerden veya bunların kullanımından kaynaklanabilecek kayıp ya da zararlar için hiçbir sorumluluk kabul etmiyoruz.</P>
              <P>Bir bağlantının eklenmesi, bağlantı verilen web sitesini onayladığımız anlamına gelmez.</P>
            </Section>

            <Section num="06" title="Sosyal Medya">
              <P>Web sitemiz sosyal medya profillerimize bağlantılar içermekte ve sosyal medya eklentileri barındırabilmektedir. Bu platformları kullanmanız, her birinin kendi hizmet koşulları ve gizlilik politikalarına tabidir. Söz konusu platformlardaki içeriklerden veya veri uygulamalarından sorumlu değiliz.</P>
            </Section>

            <Section num="07" title="Gizlilik">
              <P>Bu web sitesini kullanmanız aynı zamanda bu Kullanım Koşullarına atıfla dahil edilen <Link href="/tr/privacy-policy" style={{ color: '#FF914D', textDecoration: 'none' }}>Gizlilik Politikamız</Link> tarafından da yönetilmektedir. Uygulamalarımızı anlamak için lütfen Gizlilik Politikamızı inceleyin.</P>
            </Section>

            <Section num="08" title="Geçerli Hukuk">
              <P>Bu Kullanım Koşulları, Türkiye Cumhuriyeti yasalarına göre yönetilmekte ve yorumlanmaktadır. Bu koşullarla bağlantılı olarak ortaya çıkan her türlü uyuşmazlık, İstanbul mahkemelerinin münhasır yargı yetkisine tabi olacaktır.</P>
            </Section>

            <Section num="09" title="Koşullardaki Değişiklikler">
              <P>Bu Kullanım Koşullarını önceden bildirimde bulunmaksızın istediğimiz zaman güncelleme veya değiştirme hakkımızı saklı tutarız. Değişiklikler, web sitesinde yayımlandıktan hemen sonra yürürlüğe girer. Değişikliklerden sonra web sitesini kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.</P>
            </Section>

            <Section num="10" title="İletişim" last>
              <P>Bu Kullanım Koşulları hakkında sorularınız için lütfen bizimle iletişime geçin:</P>
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

function P({ children }) {
  return <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', marginTop: 0, marginBottom: 12 }}>{children}</p>
}

function UL({ items }) {
  return (
    <ul style={{ margin: '12px 0 16px 0', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
          <span style={{ marginTop: 7, width: 5, height: 5, borderRadius: '50%', background: '#FF914D', flexShrink: 0, display: 'inline-block' }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
