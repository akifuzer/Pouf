import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Pouf Furniture</title>
        <meta name="description" content="Privacy policy for Pouf Furniture. Learn how we collect, use, and protect your personal data." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.pouffurnitures.com/privacy-policy/" />
        <link rel="alternate" hrefLang="en" href="https://www.pouffurnitures.com/privacy-policy/" />
        <link rel="alternate" hrefLang="tr" href="https://www.pouffurnitures.com/tr/privacy-policy/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.pouffurnitures.com/privacy-policy/" />
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
            <span style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF914D' }}>Privacy Policy</span>
          </div>
          <div className="chip chip-orange" style={{ marginBottom: 20 }}>Legal</div>
          <h1 style={{ fontFamily: "'League Spartan',sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#FEFEFE', lineHeight: 1.05, marginBottom: 16, marginTop: 0 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: 'rgba(254,254,254,0.4)', margin: 0 }}>Last Updated: May 13, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: '#F5F0E8', padding: '80px 0 120px' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div style={{ maxWidth: 760 }}>

            <Section num="01" title="General Information">
              <P>At Pouf Furnitures, protecting your personal data is important to us. This privacy policy provides information on how we process your personal data collected through our website.</P>
            </Section>

            <Section num="02" title="Responsible Party">
              <P>The data controller is:</P>
              <address style={{ fontStyle: 'normal', marginTop: 16, fontFamily: "'Jost',sans-serif", fontSize: 15, lineHeight: 2, color: 'rgba(0,0,0,0.75)' }}>
                <strong style={{ color: '#0D2118' }}>Pouf Furnitures</strong><br />
                Girne Mah Narlıdere Cad No:44 Maltepe<br />
                Istanbul, Turkey<br />
                Phone: <a href="tel:+905432455503" style={{ color: '#FF914D', textDecoration: 'none' }}>+90 543 245 55 03</a>
              </address>
            </Section>

            <Section num="03" title="Collection and Storage of Personal Data">
              <SubSection label="a. When Visiting the Website">
                <P>The following information is automatically collected when you visit our website:</P>
                <UL items={['IP address', 'Date and time of the request', 'Browser type and version', 'Operating system']} />
                <P>This data is used to ensure the smooth operation of our website and for statistical purposes.</P>
              </SubSection>
              <SubSection label="b. Contact Form">
                <P>When you use our contact form, we process the data you provide (e.g., name, email address, message). This data is used solely to respond to your inquiry.</P>
              </SubSection>
              <SubSection label="c. Cookies">
                <P>Our website uses cookies to enhance the user experience. Some cookies are essential for the website&rsquo;s operation, while others are used to analyze user behavior. You can adjust your cookie preferences in your browser settings.</P>
              </SubSection>
              <SubSection label="d. Analytics Tools">
                <P>We use analytics tools such as Google Analytics to understand user behavior and optimize our website. These tools collect anonymized data.</P>
              </SubSection>
              <SubSection label="e. Social Media Plugins" last>
                <P>Our website uses plugins from social media platforms such as Facebook, Instagram, and LinkedIn. These plugins may collect data like your IP address when you visit our website. Data processing is carried out in accordance with the privacy policies of the respective platform.</P>
              </SubSection>
            </Section>

            <Section num="04" title="Data Sharing with Third Parties">
              <P>Your personal data will only be shared with third parties if required by law or with your explicit consent. Examples include:</P>
              <UL items={['Hosting providers for website operation', 'Providers of analytics tools and social media plugins']} />
            </Section>

            <Section num="05" title="Your Rights">
              <P>You have the following rights:</P>
              <UL items={[
                'Access to your stored data',
                'Correction of incorrect data',
                'Deletion of your data, provided there is no legal obligation to retain it',
                'Restriction of data processing',
                'Objection to data processing',
              ]} />
              <P>To exercise your rights, please contact us at: <a href="mailto:info@pouffurnitures.com" style={{ color: '#FF914D', textDecoration: 'none' }}>info@pouffurnitures.com</a></P>
            </Section>

            <Section num="06" title="Changes to the Privacy Policy">
              <P>We reserve the right to update this privacy policy to reflect changes in legal or technical requirements.</P>
            </Section>

            <Section num="07" title="Contact" last>
              <P>For questions about this privacy policy, you can reach us at:</P>
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
