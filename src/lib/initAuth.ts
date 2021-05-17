import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/innskra",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    // firebaseAuthEmulatorHost: "localhost:9099",
    // Required in most cases.
    firebaseClientInitConfig: {
      apiKey: process.env.FIREBASE_CLIENT_API_KEY,
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: `firebase-adminsdk-ubein@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY
        // ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
        // : undefined
      },
      databaseURL: process.env.FIREBASE_DATABASE_URL
    },
    // TODO: signed should be true and research the cookie secrets
    cookies: {
      name: "ExampleApp", // required
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
      secure: true, // set this to false in local (non-HTTPS) development
      signed: false // signed: true
    }
  });
};

export default initAuth;
