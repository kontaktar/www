import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import wrapper from "store/configureStore";
import fetch from "lib/fetchJson";
import { AuthProvider } from "hooks/useAuth";
import initAuth from "../lib/initAuth";
import "../styles/index.scss";

initAuth();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }}
      >
        <Head>
          <title>Kontaktar</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,viewport-fit=cover"
            key="viewport"
          />
        </Head>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SWRConfig>
    </>
  );
};

export default wrapper.withRedux(App);
