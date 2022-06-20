import Firebase from 'Firebase/app';
import 'Firebase/auth';
// import { debugError } from 'helpers/debug';
import { isBypassingFirebase } from "helpers/firebase";

import { configOptions } from "./firebaseConfig";
// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(configOptions)
  if (isBypassingFirebase) {
    try {
        Firebase
        .auth()
        .useEmulator(`http://${process.env.FIRESTORE_EMULATOR_HOST}/`);
        Firebase.auth().settings.appVerificationDisabledForTesting = true;
    } catch (error) {
      console.error(
        "ATTENTION: Emulator is expected to be on, turn it on with -yarn emulator-."
      );
    }
  }
}

export default Firebase;