import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions — Pouf Furniture</title>
        <meta name="description" content="Terms and Conditions for using the Pouf Furniture website. Read our usage policies, intellectual property rights, and legal notices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.pouffurnitures.com/terms-and-conditions/" />
        <link rel="alternate" hrefLang="en" href="https://www.pouffurnitures.com/terms-and-conditions/" />
        <link rel="alternate" hrefLang="tr" href="https://www.pouffurnitures.com/tr/terms-and-conditions/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pouffurnitures.com/terms-and-conditions/" />
      </Head>

      <div className="grain-overlay" aria-hidden="true" />
      <Nav alwaysDark />

      {/* PAGE HERO */}
      <section style={{ background: '#0D2118', padding: '140px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb pulse-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,145,77,0.1) 0%,transparent 70%)', top: -200, right: -150 }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <Link href="/" style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,254,254,0.35)', textDecoration: 'none' }}>Home</Link>
            <i className="ti ti-chevron-right" style={{ fontSize: 11, color: 'rgba(254,254,254,0.2)' }} />
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>Terms &amp; Conditions</span>
          </div>
          <div className="chip chip-orange" style={{ marginBottom: 20 }}>Legal</div>
          <h1 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FEFEFE', lineHeight: 1.05, marginBottom: 16, marginTop: 0 }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.4)', margin: 0 }}>Last Updated: May 13, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: '#F5F0E8', padding: '80px 0 120px' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ maxWidth: 760 }}>

            <Section num="01" title="General">
              <P>By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of our website.</P>
              <P>This website is operated by <strong>Pouf Furnitures</strong>, located at Girne Mah Narlıdere Cad No:44 Maltepe, Istanbul, Turkey. For any questions, you can reach us at <a href="mailto:info@pouffurnitures.com" style={{ color: '#FF914D', textDecoration: 'none' }}>info@pouffurnitures.com</a>.</P>
            </Section>

            <Section num="02" title="Intellectual Property">
              <P>All content on this website — including text, images, graphics, logos, and other materials — is the property of Pouf Furnitures and is protected by applicable copyright and intellectual property laws.</P>
              <P>You may not reproduce, distribute, modify, or republish any content from this website without our prior written consent.</P>
            </Section>

            <Section num="03" title="Acceptable Use">
              <P>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</P>
              <UL items={[
                'Use the website in any way that violates applicable local, national, or international laws or regulations',
                'Transmit any unsolicited or unauthorized advertising or promotional material',
                'Attempt to gain unauthorized access to any part of the website or its related systems',
                'Engage in any conduct that restricts or inhibits anyone\'s use or enjoyment of the website',
              ]} />
            </Section>

            <Section num="04" title="Disclaimer of Liability">
              <P>The information on this website is provided for general informational purposes only. While we strive to keep the content accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of any information on the site.</P>
              <P>We shall not be held liable for any loss or damage arising directly or indirectly from your use of, or inability to use, this website or any content found on it.</P>
            </Section>

            <Section num="05" title="Third-Party Links">
              <P>Our website may contain links to external websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</P>
              <P>The inclusion of a link does not imply our endorsement of the linked website.</P>
            </Section>

            <Section num="06" title="Social Media">
              <P>Our website includes links to our social media profiles and may feature social media plugins. Your use of those platforms is subject to their respective terms of service and privacy policies. We are not responsible for any content or data practices on those platforms.</P>
            </Section>

            <Section num="07" title="Privacy">
              <P>Your use of this website is also governed by our <Link href="/privacy-policy" style={{ color: '#FF914D', textDecoration: 'none' }}>Privacy Policy</Link>, which is incorporated into these Terms and Conditions by reference. Please review our Privacy Policy to understand our practices.</P>
            </Section>

            <Section num="08" title="Governing Law">
              <P>These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Turkey. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Istanbul.</P>
            </Section>

            <Section num="09" title="Changes to These Terms">
              <P>We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.</P>
            </Section>

            <Section num="10" title="Contact" last>
              <P>If you have any questions about these Terms and Conditions, please contact us:</P>
              <address style={{ fontStyle: 'normal', marginTop: 16, fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 2, color: 'rgba(0,0,0,0.75)' }}>
                <strong style={{ color: '#0D2118' }}>Pouf Furnitures</strong><br />
                Girne Mah Narlıdere Cad No:44 Maltepe<br />
                Istanbul, Turkey<br />
                Phone: <a href="tel:+905432455503" style={{ color: '#FF914D', textDecoration: 'none' }}>+90 543 245 55 03</a><br />
                E-Mail: <a href="mailto:info@pouffurnitures.com" style={{ color: '#FF914D', textDecoration: 'none' }}>info@pouffurnitures.com</a>
              </address>
            </Section>

          </div>
        </div>
      </section>

      <Footer />
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
