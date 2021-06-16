import React, { useEffect } from "react";
import firebase from "firebase/app";
import { NextPage } from "next";
import { useRouter } from "next/router";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import useAuth from "hooks/useAuth";
import { GetFireBaseId } from "pages/api/endpoints";
import { MainLayout, RegisterContainer } from "layouts";

type Props = {
  reroute?: boolean;
};
const Register: NextPage<Props> = ({ reroute }) => {
  const router = useRouter();
  const { connectFirebaseUser } = useAuth();
  useEffect(() => {
    if (reroute) {
      router.push("/profill");
    }
  });

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          console.log("user", user);
          const isNewUser = user
            ? user?.metadata?.creationTime === user?.metadata?.lastSignInTime
            : false;
          const { userId } = await GetFireBaseId(user?.uid);
          if (isNewUser && !userId) {
            // TODO: make sure the user does not exist in firebase_db already
            connectFirebaseUser(
              user?.phoneNumber,
              user?.uid,
              user?.metadata?.creationTime
            );
          }
        } else {
          router.push("/innskra");
        }
      });
    return () => unregisterAuthObserver(); // un-register observers on unmounts.
  }, []);
  return (
    <MainLayout>
      <RegisterContainer />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req }) => {
    const user = req.session.get("user");
    if (user !== undefined) {
      return { props: { reroute: true } };
    }
    return {
      props: {}
    };
  })
);

export default Register;
