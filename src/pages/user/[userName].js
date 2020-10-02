import React from "react";
import PropTypes from "prop-types";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";
import { getUserByUserNameSuccess } from "src/store/actions";
import { GetUserByUserName } from "src/pages/api/endpoints";
import useAuth from "hooks/useAuth";
import wrapper from "store/configureStore";
import withSession from "../../lib/sessions";

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
