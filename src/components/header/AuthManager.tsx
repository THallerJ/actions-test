import styles from './styles/header.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { ProtectedComponent } from '@/components';

const AuthManager = ({ isMobile }: AuthManagerProps) => {
  return (
    <div className={isMobile ? styles.profileMobile : styles.profile}>
      <ProtectedComponent unprotected={<UnprotectedAuth />}>
        <ProtectedAuth isMobile={isMobile} />
      </ProtectedComponent>
    </div>
  );
};

export default AuthManager;

const ProtectedAuth = ({ isMobile }: AuthManagerProps) => {
  const { user } = useUser();

  return (
    <div className={isMobile ? styles.loggedInMobile : styles.loggedIn}>
      <span>Hi, {user?.nickname}</span>
      <Link prefetch={false} href="/api/auth/logout" className={styles.link}>
        Logout
      </Link>
    </div>
  );
};

const UnprotectedAuth = () => (
  <div className={styles.auth}>
    <Link prefetch={false} href="/api/auth/login" className={styles.link}>
      Login
    </Link>
    <span>/</span>
    <Link prefetch={false} href="/api/auth/signup" className={styles.link}>
      Sign Up
    </Link>
  </div>
);

type AuthManagerProps = {
  isMobile?: boolean;
};
