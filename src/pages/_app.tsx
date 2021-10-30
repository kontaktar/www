import React, { useEffect } from "react";
import firebase from "firebase/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import wrapper from "store/configureStore";
import fetch from "lib/fetchJson";
import { configOptions } from "lib/firebaseConfig";
import { debugError } from "helpers/debug";
import { isBypassingFirebase } from "helpers/firebase";
import { AuthProvider } from "hooks/useAuth";
import AdminProvider from "components/Admin/AdminProvider";
import ErrorBoundary from "components/ErrorBoundary";
import "../styles/index.scss";

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
  // console.log("prisma", prisma);
  useEffect(() => {
    async () => {
      if (typeof window !== undefined) {
        const prisma = require("../database/");
        const newUser = await prisma.user.create({
          data: {
            name: "Alice",
            email: "alice@prisma.io"
          }
        });

        const users = await prisma.user.findMany();
        console.log("newUser", newUser);
        console.log("users", users);
      }
    };
  }, []);

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
            <AdminProvider>
              <Component {...pageProps} />
            </AdminProvider>
          </AuthProvider>
        </SWRConfig>
      </ErrorBoundary>
    </>
  );
};

export default wrapper.withRedux(App);
