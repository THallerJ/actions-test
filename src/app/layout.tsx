import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Header, AlertWrapper } from '@/components';
import './globals.scss';
import styles from './layout.module.scss';
import LayoutWrapper from './LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tab Machine',
  description: 'A website for creating and sharing guitar tablature.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <LayoutWrapper>
          <body className={`${inter.className}`}>
            <Header />
            <AlertWrapper />
            <main className={styles.main}>{children}</main>
          </body>
        </LayoutWrapper>
      </UserProvider>
    </html>
  );
}
