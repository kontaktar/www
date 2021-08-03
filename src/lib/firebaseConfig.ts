// eslint-disable-next-line import/prefer-default-export
export const firebaseAdminInitConfig = {
  credential: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: `firebase-adminsdk-ubein@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
    // The private key must not be accesssible on the client side.
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  },
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebase.io`
};

export const configOptions = {
  apiKey: process.env.FIREBASE_CLIENT_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebase.io`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
