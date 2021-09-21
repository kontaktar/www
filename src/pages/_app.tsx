import React from "react";
import firebase from "firebase/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import wrapper from "store/configureStore";
import fetch from "lib/fetchJson";
import { configOptions } from "lib/firebaseConfig";
import { debugError } from "helpers/debug";
import { AuthProvider } from "hooks/useAuth";
import AdminProvider from "components/Admin/AdminProvider";
import ErrorBoundary from "components/ErrorBoundary";
import "../styles/index.scss";

if (!firebase.apps.length) {
  firebase.initializeApp(configOptions);

  if (
    process.env.NODE_ENV === "development" &&
    process.env.FIREBASE_EMULATOR === "1"
  ) {
    // firebase.firestore().settings({ host: 'localhost:4000', ssl: false });
    try {
      firebase.auth().useEmulator("http://localhost:9099/");
    } catch (error) {
      debugError(
        "Emulator is expected to be on, turn it on with -yarn emulator- or set env.FIREBASE_EMULATOR = 0"
      );
    }
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ErrorBoundary>
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
            {/* <AdminProvider> */}
            <Component {...pageProps} />
            {/* </AdminProvider> */}
          </AuthProvider>
        </SWRConfig>
      </ErrorBoundary>
    </>
  );
};

export default wrapper.withRedux(App);
