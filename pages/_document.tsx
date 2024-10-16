import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='zh'>
      <Head>
        {/* Global Simplified Chinese Font */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap'
          rel='stylesheet'
        />

        {/* ZL Asica personal JS */}
        <Script
          src='https://cdn.jsdelivr.net/gh/zl-asica/web-cdn/js/zlasica.js'
          strategy='lazyOnload'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
