import { getConfig } from '@/services/config/getConfig';
import type { Metadata } from 'next';
import React from 'react';

const config = getConfig();

export const metadata: Metadata = {
  title: `About - ${config.title}`,
  description: `About page of ${config.title} - ${config.description}`,
  openGraph: {
    title: `About - ${config.title}`,
    description: `About page of ${config.title} - ${config.description}`,
    type: 'website',
    locale: config.lang,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
