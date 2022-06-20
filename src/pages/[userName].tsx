import React, { ReactElement } from "react";
import { wrapper } from "store";
import { fetchUserByUserName } from "store/users";
import { GetUserByUserName } from "lib/endpoints";
import { withSession } from "lib/sessions";
import { debugError } from "helpers/debug";
import useAuth from "hooks/useAuth";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";

type Props = {
  userName: string;
};
const UserProfile = ({ userName }: Props): ReactElement => {
  const { user } = useAuth();
  console.log("RENDERED: UserProfile");

  return (
    <>
      {!user?.isLoggedIn ? (
        <MainLayout>
          <ProfileContainer userName={userName} />
        </MainLayout>
      ) : (
        <UserLayout>
          <ProfileContainer userName={userName} />
        </UserLayout>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  withSession(async ({ query: { userName } }) => {
    if (userName === "favicon.ico") {
      // Because usernames can be on root level, favicon.ico is being picked up. Bypass it,
      // no need to do a failed database lookup on every rerender.
      return {};
    }
    try {
      if (userName !== "__webpack_hmr") {
        await store.dispatch(fetchUserByUserName(userName));
      }
    } catch (error) {
      debugError(`No user named: ${userName}`);
    }

    return {
      props: { userName }
    };
  })
);

export default UserProfile;
