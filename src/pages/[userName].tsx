import React, { ReactElement } from "react";
import { getUserByUserNameSuccess } from "store/actions";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import useAuth from "hooks/useAuth";
import { GetUserByUserName } from "pages/api/endpoints";
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
    try {
      const userResult = await GetUserByUserName(userName);
      store.dispatch(getUserByUserNameSuccess(userResult));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("No user ", userName);
    }

    return {
      props: { userName }
    };
  })
);

export default UserProfile;
