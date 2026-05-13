<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>XML Sitemap — Pouf Furniture</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;900&amp;family=Jost:wght@400;500&amp;display=swap" rel="stylesheet"/>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Jost', sans-serif; background: #F5F0E8; color: #0D2118; min-height: 100vh; }
          header { background: #0D2118; padding: 40px 48px; }
          .brand { font-family: 'League Spartan', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; color: #FEFEFE; }
          .brand span { color: #FF914D; }
          .subtitle { font-size: 13px; color: rgba(254,254,254,0.4); margin-top: 6px; }
          .count { display: inline-block; margin-top: 14px; background: rgba(255,145,77,0.12); border: 1px solid rgba(255,145,77,0.25); color: #FF914D; font-size: 12px; font-weight: 500; padding: 4px 14px; border-radius: 20px; }
          main { max-width: 1200px; margin: 0 auto; padding: 48px 24px; }
          table { width: 100%; border-collapse: collapse; background: #FEFEFE; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 20px rgba(13,33,24,0.08); }
          thead { background: #1C3A2E; }
          th { font-family: 'League Spartan', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(254,254,254,0.45); padding: 14px 20px; text-align: left; }
          td { padding: 13px 20px; font-size: 13px; border-bottom: 1px solid rgba(13,33,24,0.06); vertical-align: middle; }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: rgba(13,33,24,0.02); }
          a { color: #1C3A2E; text-decoration: none; font-weight: 500; word-break: break-all; }
          a:hover { color: #FF914D; }
          .tag { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; padding: 2px 7px; border-radius: 4px; margin-right: 3px; text-transform: uppercase; }
          .tag-en { background: rgba(28,58,46,0.1); color: #1C3A2E; }
          .tag-tr { background: rgba(255,145,77,0.12); color: #c4602a; }
          .tag-xd { background: rgba(13,33,24,0.06); color: rgba(13,33,24,0.35); }
          .priority { font-weight: 600; color: #FF914D; }
          .date { color: rgba(13,33,24,0.4); font-size: 12px; }
        </style>
      </head>
      <body>
        <header>
          <div class="brand">Pouf <span>Furniture</span></div>
          <div class="subtitle">XML Sitemap — pouffurnitures.com</div>
          <div class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs indexed</div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Languages</th>
                <th>Priority</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td>
                    <xsl:for-each select="xhtml:link">
                      <xsl:choose>
                        <xsl:when test="@hreflang = 'en'"><span class="tag tag-en">EN</span></xsl:when>
                        <xsl:when test="@hreflang = 'tr'"><span class="tag tag-tr">TR</span></xsl:when>
                        <xsl:when test="@hreflang = 'x-default'"><span class="tag tag-xd">default</span></xsl:when>
                      </xsl:choose>
                    </xsl:for-each>
                  </td>
                  <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
                  <td class="date"><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
