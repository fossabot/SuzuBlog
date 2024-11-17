import type { Metadata } from 'next';
import React from 'react';
import { Noto_Sans_SC, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

import { getConfig } from '@/services/config';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BackToTop from '@/components/common/BackToTop';

import './globals.css';

const config: Config = getConfig();

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-noto-sans-sc',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-jetbrains-mono',
});

const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.title} - ${config.subTitle}`,
  description: config.description,
  keywords: config.keywords,
  authors: [{ url: config.author.link, name: config.author.name }],
  openGraph: {
    siteName: `${config.title} - ${config.subTitle}`,
    title: `${config.title} - ${config.subTitle}`,
    images: config.avatar,
    description: config.description,
    type: 'website',
    locale: config.lang,
    url: config.siteUrl,
  },
  twitter: {
    card: 'summary',
    title: `${config.title} - ${config.subTitle}`,
    description: config.description,
    images: config.avatar,
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config: Config = getConfig();
  const googleAnalytics: string = config.googleAnalytics || '';
  const jsFiles: string[] = config.headerJavascript || [];

  return (
    <html lang={config.lang}>
      {/* If rss set in config */}
      {config.socialMedia.rss && (
        <link
          rel='alternate'
          type='application/rss+xml'
          title='RSS Feed'
          href={config.siteUrl + '/feed.xml'}
        />
      )}
      {/* Custom js */}
      {jsFiles.map((jsFile, index) => (
        <Script
          key={index}
          src={jsFile}
          strategy='afterInteractive'
        />
      ))}
      {/* Google Analytics Script */}
      {googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            strategy='afterInteractive'
          />
          <Script
            id='google-analytics'
            strategy='afterInteractive'
          >
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${googleAnalytics}');
          `}
          </Script>
        </>
      )}

      <body
        className={`${notoSansSC.variable} ${jetBrainsMono.variable} flex max-h-full min-h-screen flex-col antialiased`}
      >
        <Header config={config} />
        <main className='flex-grow'>{children}</main>
        <BackToTop />
        <Footer config={config} />
      </body>
    </html>
  );
}

export { metadata, RootLayout as default };
