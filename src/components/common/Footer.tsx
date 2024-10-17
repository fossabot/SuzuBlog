import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactList = [
    {
      href: 'https://www.instagram.com/zl_asica/',
      title: 'Instagram',
      icon: <FaInstagram size={28} />,
    },
    {
      href: 'https://github.com/ZL-Asica',
      title: 'GitHub',
      icon: <FaGithub size={28} />,
    },
    {
      href: 'https://linkedin.com/in/elara-liu',
      title: 'LinkedIn',
      icon: <FaLinkedinIn size={28} />,
    },
  ];

  return (
    <footer
      className='mt-10'
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className='mx-auto max-w-7xl px-4 py-4 text-center'>
        <div className='mb-5 flex justify-center space-x-4'>
          {contactList.map((contact) => (
            <a
              key={contact.title}
              href={contact.href}
              title={contact.title}
              aria-label={contact.title}
              target='_blank'
              rel='noopener noreferrer'
            >
              {contact.icon}
            </a>
          ))}
        </div>
        <p>
          © 2024-{currentYear} Suzu Blog.
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
