// ./pages/api/login
import { UserSessionStorage } from "types";
import { withSession } from "lib/sessions";
import { saveUserToSession } from "lib/sessions";

const Register = withSession(async (request, response) => {
const { body: firebaseUser } = request;
  console.log('firebaseUser', firebaseUser)
  console.log('firebaseUser', firebaseUser)
  console.log('firebaseUser', firebaseUser)

const user: UserSessionStorage = {
    details: {
        id: undefined,
        phoneNumber: firebaseUser?.phoneNumber,
        createdAt: firebaseUser?.metadata?.creationTime
    },
    firebase: {
        id: firebaseUser?.uid,
        token: request.headers.authorization
    },
    isLoggedIn: false
};
try {
    await saveUserToSession(request, response, user);
} catch (err) {
    console.log("err", err);
} finally {
    response.status(200).json(user);
}

});

export default Register;
