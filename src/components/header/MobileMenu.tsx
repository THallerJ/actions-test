import AuthManager from './AuthManager';
import styles from './header.module.scss';
import Link from 'next/link';

type MobileMenuProps = {
  showMenu: boolean;
  onNavigate: () => void;
};

const MobileMenu = ({ showMenu, onNavigate }: MobileMenuProps) => {
  return (
    <div
      className={`${styles.mobileMenu} 
        ${showMenu ? styles.mobileMenuTransform : null}`}
    >
      <div className={styles.linksMobile}>
        <Link
          href={'/tabeditor'}
          className={styles.linkMobile}
          onClick={onNavigate}
        >
          View Tabs
        </Link>
        <Link
          href={'/tabeditor'}
          className={styles.linkMobile}
          onClick={onNavigate}
        >
          Create Tab
        </Link>
        <Link
          href={'/tabeditor'}
          className={styles.linkMobile}
          onClick={onNavigate}
        >
          My Tabs
        </Link>
      </div>
      <AuthManager isMobile />
    </div>
  );
};

export default MobileMenu;
