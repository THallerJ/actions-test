import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Header } from '@/components';
import './globals.scss';
import styles from './layout.module.scss';
import ReactQueryWrapper from './ReactQueryWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guitar Tab',
  description: 'A website for creating a viewing guitar tablature.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <ReactQueryWrapper>
          <body className={inter.className}>
            <Header />
            <main className={styles.main}>{children}</main>
          </body>
        </ReactQueryWrapper>
      </UserProvider>
    </html>
  );
}
