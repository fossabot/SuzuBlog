import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='mt-10'
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className='mx-auto max-w-7xl px-4 py-4 text-center'>
        <p>
          © 2024-{currentYear} Suzu Blog.
          <br />
          All rights reserved.
        </p>
        <div className='mt-2 flex justify-center space-x-4'>
          <a
            href='https://www.instagram.com/zl_asica/'
            className='hover:text-sakuraPink'
            aria-label='Instagram'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram size={24} />
          </a>
          <a
            href='https://github.com/ZL-Asica'
            className='hover:text-sakuraPink'
            aria-label='GitHub'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub size={24} />
          </a>
          <a
            href='https://linkedin.com/in/elara-liu'
            className='hover:text-sakuraPink'
            aria-label='LinkedIn'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
