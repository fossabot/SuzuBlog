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
        hostname: '**.loli.net',
      },
      {
        protocol: 'https',
        hostname: '**.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com.cn',
      },
      {
        protocol: 'https',
        hostname: '**.fghrsh.net',
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
    ];
  },
};

export default nextConfig;
