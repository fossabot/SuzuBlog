import Link from 'next/link';
import {
  FaHouse,
  FaRegNewspaper,
  FaPeopleGroup,
  FaInfo,
} from 'react-icons/fa6';

interface MenuItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

interface HeaderMenuProperties {
  translation: Translation;
  isMobile: boolean;
  ulClassName?: string;
  onClickHandler?: () => void;
}

const HeaderMenu = ({
  translation,
  isMobile,
  ulClassName,
  onClickHandler,
}: HeaderMenuProperties) => {
  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <FaHouse /> },
    {
      href: '/posts',
      label: translation.posts.title,
      icon: <FaRegNewspaper />,
    },
    {
      href: '/friends',
      label: translation.friends.title,
      icon: <FaPeopleGroup />,
    },
    { href: '/about', label: translation.about.title, icon: <FaInfo /> },
  ];

  return (
    <ul className={ulClassName}>
      {menuItems.map((item) => (
        <li
          key={item.href}
          className='group relative'
        >
          <Link
            href={item.href}
            className='relative inline-flex items-center gap-2 p-2 no-underline transition-all duration-300 ease-in-out hover:scale-110'
            onClick={onClickHandler}
            aria-label={`${translation.navigate} ${item.label}`}
          >
            {item.icon}
            {item.label}
            {!isMobile && (
              <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--sakuraPink)] transition-all duration-300 group-hover:w-full'></span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
