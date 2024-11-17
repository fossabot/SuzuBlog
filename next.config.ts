import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/archive',
        destination: '/posts',
        permanent: true,
      },
      {
        source: '/archive/',
        destination: '/posts',
        permanent: true,
      },
      {
        source: '/tags/:slug',
        destination: '/posts?tag=:slug',
        permanent: true,
      },
      {
        source: '/tags/:slug/',
        destination: '/posts?tag=:slug',
        permanent: true,
      },
      {
        source: '/feed/',
        destination: '/feed.xml',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
