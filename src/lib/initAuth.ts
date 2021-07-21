import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    debug: true,
    // authPageURL: "/innskra", //  Optional unless using the AuthAction.REDIRECT_TO_LOGIN auth action.
    // appPageURL: "/", //  Optional unless using the AuthAction.REDIRECT_TO_APP auth action.
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    firebaseAuthEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    // Required in most cases.
    firebaseClientInitConfig: {
      apiKey: process.env.FIREBASE_CLIENT_API_KEY,
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebase.io`,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: `firebase-adminsdk-ubein@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
      },
      databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebase.io`
    },
    // TODO: signed should be true and research the cookie secrets
    cookies: {
      name: "Kontaktar", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // set this to false in local (non-HTTPS) development
      signed: true
    }
  });
};

export default initAuth;
