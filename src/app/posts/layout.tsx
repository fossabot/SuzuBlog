import { getConfig } from '@/services/config/getConfig';
import type { Metadata } from 'next';
import React from 'react';

const config = getConfig();

export const metadata: Metadata = {
  title: `Posts - ${config.title}`,
  description: `Posts page of ${config.title} - ${config.description}`,
  openGraph: {
    title: `Posts - ${config.title}`,
    description: `Posts page of ${config.title} - ${config.description}`,
    type: 'website',
    locale: config.lang,
  },
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
