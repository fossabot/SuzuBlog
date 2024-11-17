'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SocialMediaLink from '@/components/common/SocialMediaLinks';

interface FooterProperties {
  config: Config;
}

const Footer = ({ config }: FooterProperties) => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <footer className='mb-1 mt-10 w-full'>
      <div className='mx-auto max-w-7xl px-4 py-4 text-center'>
        {!isHomePage && (
          <SocialMediaLink
            socialMedia={config.socialMedia}
            siteUrl={config.siteUrl}
          />
        )}
        <p className='text-[var(--gray)]'>
          {`© ${config.startYear && config.startYear < currentYear ? `${config.startYear} - ` : ''}${currentYear} ${config.title}`}
        </p>
        <p className='text-sm text-[var(--gray)]'>
          Theme{' '}
          <Link
            href='https://suzu.zla.app/'
            target='_blank'
            aria-label="Suzu's homepage (new tab)"
            className='decoration-dashed underline-offset-2'
          >
            Suzu
          </Link>{' '}
          by{' '}
          <Link
            href='https://www.zla.app/'
            target='_blank'
            aria-label="ZL Asica's homepage (new tab)"
            className='decoration-dashed underline-offset-2'
          >
            ZL Asica
          </Link>
        </p>
        {config.slotFooter && (
          <div dangerouslySetInnerHTML={{ __html: config.slotFooter }} />
        )}
      </div>
    </footer>
  );
};

export default Footer;
