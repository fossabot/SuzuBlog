import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--font-roboto',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Suzu - Next.js Blog Template',
  description:
    'Suzu is a minimalist blog template with a serene sakura-inspired theme, blending modern design with a touch of traditional Japanese aesthetics.',
  keywords:
    'Suzu, Next.js, markdown blog, Tailwind CSS, blog template, sakura, ZL Asica',
  authors: [{ name: 'ZL Asica' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh'>
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
