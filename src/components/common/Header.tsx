'use client';

import Link from 'next/link';
import {
  FaHouse,
  FaInfo,
  FaRegNewspaper,
  FaBars,
  FaAngleUp,
} from 'react-icons/fa6';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Ensure focus is managed when the menu is open for accessibility
  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  // Menu items array to avoid repetition
  const menuItems = [
    { href: '/', label: 'Home', icon: <FaHouse /> },
    { href: '/blog', label: 'Blog', icon: <FaRegNewspaper /> },
    { href: '/about', label: 'About', icon: <FaInfo /> },
  ];

  // Function to generate menu items for both mobile and desktop
  const renderMenuItems = (onClickHandler?: () => void) =>
    menuItems.map((item) => (
      <li key={item.href} className='border-b last:border-none'>
        <Link
          href={item.href}
          className='flex items-center gap-2 p-2'
          onClick={onClickHandler}
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    ));

  return (
    <header
      className='shadow-md'
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className='mx-auto max-w-7xl px-4 py-4'>
        <nav className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Suzu Blog</h1>

          {/* Hamburger Menu Button */}
          <button
            className='text-3xl md:hidden'
            onClick={toggleMenu}
            aria-label='Toggle menu'
            aria-expanded={isOpen}
            aria-controls='mobile-menu'
          >
            {isOpen ? <FaAngleUp /> : <FaBars />}
          </button>

          {/* Full Navigation - Hidden on small screens */}
          <ul className='hidden space-x-6 md:flex'>{renderMenuItems()}</ul>

          {/* Mobile Navigation - Visible on small screens */}
          {isOpen && (
            <div
              id='mobile-menu'
              ref={menuRef}
              tabIndex={-1}
              role='menu'
              aria-hidden={!isOpen}
              className='absolute left-0 top-16 w-full border-t border-sakuraPink bg-lightBackground p-4 shadow-lg dark:bg-darkBackground md:hidden'
            >
              <ul className='flex flex-col gap-2'>
                {renderMenuItems(toggleMenu)}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
