/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import wrapper from "store/configureStore";
// import { END } from "redux-saga";
import fetch from "lib/fetchJson";
import { AuthProvider } from "hooks/useAuth";
import "../styles/index.scss";

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }: AppProps) => {
  // componentDidMount() {
  //   // Remove the server-side injected CSS. - MaterialUI
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.remove();
  //   }
  // }

  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (error) => {
            console.error(error);
          }
        }}
      >
        <Head>
          <title>Spez</title>
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
App.getInitialProps = async ({ Component, ctx }) => {
  // const { req, store } = ctx;
  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  };

  // 2. Stop the saga if on server
  // if (req) {
  //   store.dispatch(END);
  //   await store.sagaTask.toPromise();
  // }

  return { pageProps };
};
export default wrapper.withRedux(App);
