import type { AppProps } from 'next/app';
import Head from 'next/head';
import localFont from 'next/font/local';
import { SessionProvider } from "next-auth/react";
import { Layout } from '@/components/Layout';
import SEO from '@/components/SEO';

import '@/styles/global-css.css';

const font = localFont({ src: './SpoqaHanSansNeo-Regular.woff2' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <link href="favicons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="favicons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="favicons/apple-icon-180x180.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <SEO />
      <Layout className={font.className}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Layout>
    </>
  );
}
