import React from "react";
import FirebaseProvider from "providers/FirebaseAuthUser";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { wrapper } from "store";
import fetch from "lib/fetchJson";
import { AuthProvider } from "hooks/useAuth";
import AdminProvider from "components/Admin/AdminProvider";
import ErrorBoundary from "components/ErrorBoundary";
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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ErrorBoundary>
        <FirebaseProvider>
          <AuthProvider>
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
                <AdminProvider>
                  {/* <UserProvider> */}
                  <Component {...pageProps} />
                  {/* </UserProvider> */}
                </AdminProvider>
              </React.StrictMode>
            </SWRConfig>
          </AuthProvider>
        </FirebaseProvider>
      </ErrorBoundary>
    </>
  );
};

export default wrapper.withRedux(App);
