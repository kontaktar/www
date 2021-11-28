import React, { useEffect } from "react";
import firebase from "firebase/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { wrapper } from "store";
import fetch from "lib/fetchJson";
import { configOptions } from "lib/firebaseConfig";
import { debugError } from "helpers/debug";
import { isBypassingFirebase } from "helpers/firebase";
import { AuthProvider } from "hooks/useAuth";
import AdminProvider from "components/Admin/AdminProvider";
import ErrorBoundary from "components/ErrorBoundary";
import { LoggedInUserProvider } from "../providers/AuthorizedUser";
import { UserProvider } from "../providers/User";
import "../styles/index.scss";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");

  // eslint-disable-next-line no-console
  console.debug(
    "Applying whyDidYouRender, to help you locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render"
  );

  // See https://github.com/welldone-software/why-did-you-render#options
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOwnerReasons: true,
    collapseGroups: true
  });
}
if (!firebase.apps.length) {
  firebase.initializeApp(configOptions);
  if (isBypassingFirebase) {
    try {
      firebase
        .auth()
        .useEmulator(`http://${process.env.FIRESTORE_EMULATOR_HOST}/`);
      firebase.auth().settings.appVerificationDisabledForTesting = true;
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
            revalidateOnFocus: process.env.NODE_ENV === "production",
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
          <React.StrictMode>
            <LoggedInUserProvider>
              <AuthProvider>
                <AdminProvider>
                  <UserProvider>
                    <Component {...pageProps} />
                  </UserProvider>
                </AdminProvider>
              </AuthProvider>
            </LoggedInUserProvider>
          </React.StrictMode>
        </SWRConfig>
      </ErrorBoundary>
    </>
  );
};

export default wrapper.withRedux(App);
