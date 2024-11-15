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
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config: Config = getConfig();

  return (
    <html lang={config.lang}>
      <Script
        src='/custom.js'
        strategy='lazyOnload'
      />
      <body
        className={`${notoSansSC.variable} ${jetBrainsMono.variable} flex max-h-full min-h-screen flex-col antialiased`}
      >
        <Header siteTitle={config.title} />
        <main className='flex-grow'>{children}</main>
        <BackToTop />
        <Footer config={config} />
      </body>
    </html>
  );
}

export { metadata, RootLayout as default };
