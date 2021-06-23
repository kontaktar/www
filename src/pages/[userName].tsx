import React, { ReactElement } from "react";
import { getUserByUserNameSuccess } from "store/actions";
import wrapper from "store/configureStore";
import { GetUserByUserName } from "lib/endpoints";
import withSession from "lib/sessions";
import { debugError } from "helpers/debug";
import useAuth from "hooks/useAuth";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";

type Props = {
  userName: string;
};
const UserProfile = ({ userName }: Props): ReactElement => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn ? (
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
      const userResult = await GetUserByUserName(userName);
      store.dispatch(getUserByUserNameSuccess(userResult));
    } catch (error) {
      debugError(`No user named: ${userName}`);
    }

    return {
      props: { userName }
    };
  })
);

export default UserProfile;
