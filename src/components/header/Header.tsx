'use client';
import styles from './header.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ProtectedComponent } from '@/components';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.title}>Guitar Tab</h1>
      </Link>
      <Link href={'/tabeditor'}>Tab</Link>
      <AuthManager />
    </header>
  );
};

export default Header;

const AuthManager = () => {
  const { user } = useUser();

  return (
    <>
      <ProtectedComponent protect>
        <span>
          Hello, {user?.name}. Your email is {user?.email}.
        </span>
        <a href="/api/auth/logout">Logout</a>
      </ProtectedComponent>
      <ProtectedComponent>
        <div className={styles.auth}>
          <a href="/api/auth/login">Login</a>
          <a href="/api/auth/signup">Sign Up</a>
        </div>
      </ProtectedComponent>
    </>
  );
};
