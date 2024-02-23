'use client';
import styles from './styles/header.module.scss';
import { useState } from 'react';
import Link from 'next/link';
import AuthManager from './AuthManager';
import MobileMenu from './MobileMenu';
import { MenuButton } from '@/components';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const onNavigate = () => setShowMenu(false);

  return (
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <Link href={'/'} className={styles.link}>
          <h1 onClick={onNavigate} className={styles.title}>
            Guitar Tab
          </h1>
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href={'/'} className={styles.linkLarge}>
          View Tabs
        </Link>
        <Link href={'/tab_editor'} className={styles.linkLarge}>
          Create Tab
        </Link>
        <Link href={'/my_tabs'} className={styles.linkLarge}>
          My Tabs
        </Link>
      </nav>
      <AuthManager />
      <div className={styles.menuBtn}>
        <MenuButton
          onClick={() => setShowMenu(prev => !prev)}
          toggled={showMenu}
        />
      </div>
      <MobileMenu showMenu={showMenu} onNavigate={onNavigate} />
    </header>
  );
};

export default Header;
