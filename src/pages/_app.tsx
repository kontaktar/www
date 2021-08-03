import React from "react";
import firebase from "firebase/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import wrapper from "store/configureStore";
import fetch from "lib/fetchJson";
import { configOptions } from "lib/firebaseConfig";
import { AuthProvider } from "hooks/useAuth";
import "../styles/index.scss";

if (!firebase.apps.length) {
  firebase.initializeApp(configOptions);

  if (
    process.env.NODE_ENV === "development" &&
    process.env.FIREBASE_EMULATOR === "1"
  ) {
    // firebase.firestore().settings({ host: 'localhost:4000', ssl: false });
    firebase.auth().useEmulator("http://localhost:9099/");
  }
}

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
