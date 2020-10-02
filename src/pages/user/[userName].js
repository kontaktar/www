import React from "react";
import PropTypes from "prop-types";
import { getUserByUserNameSuccess } from "store/actions";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import useAuth from "hooks/useAuth";
import { GetUserByUserName } from "pages/api/endpoints";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";

const UserProfile = ({ userName }) => {
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

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, query: { userName } }) => {
    const userResult = await GetUserByUserName(userName);
    store.dispatch(getUserByUserNameSuccess(userResult));

    return {
      props: { userName }
    };
  })
);

UserProfile.propTypes = {
  userName: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
};

UserProfile.defaultProps = {
  userName: ""
};

export default UserProfile;
