import { getConfig } from '@/services/config/getConfig';
import type { Metadata } from 'next';
import React from 'react';

const config = getConfig();

export const metadata: Metadata = {
  title: `Friends - ${config.title}`,
  description: `Friends page of ${config.title} - ${config.description}`,
  openGraph: {
    title: `Friends - ${config.title}`,
    description: `Friends page of ${config.title} - ${config.description}`,
    type: 'website',
    locale: config.lang,
  },
};

export default function FriendsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
