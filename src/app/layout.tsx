import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Header } from '@/components';
import './globals.scss';
import styles from './layout.module.scss';
import ReactQueryWrapper from './ReactQueryWrapper';

const montserrat = Manrope({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

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
          <body className={`${montserrat.className}`}>
            <Header />
            <main className={styles.main}>{children}</main>
          </body>
        </ReactQueryWrapper>
      </UserProvider>
    </html>
  );
}
