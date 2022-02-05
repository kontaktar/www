import React, { ReactElement } from "react";
import { getUserByUserNameSuccess } from "store/actions";
import wrapper from "store/configureStore";
import { GetUserByUserName } from "lib/endpoints";
import withSession from "lib/sessions";
import useUser from "lib/useUser";
import { debugError } from "helpers/debug";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";

type Props = {
  userName: string;
};
const UserProfile = ({ userName }: Props): ReactElement => {
  const { user } = useUser();
  return (
    <>
      {!user.isLoggedIn ? (
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

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, query: { userName } }) => {
    if (userName === "favicon.ico") {
      // Because usernames can be on root level, favicon.ico is being picked up. Bypass it,
      // no need to do a failed database lookup on every rerender.
      return {};
    }
    try {
      if (userName !== "__webpack_hmr") {
        const userResult = await GetUserByUserName(userName);
        store.dispatch(getUserByUserNameSuccess(userResult));
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
