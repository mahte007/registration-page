import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { FC } from 'react';

import '../styles/styles.scss';
import { Header } from 'header/header';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Header className="header-container" />
      <Component {...pageProps} />
    </>
  );
};

export default App;
