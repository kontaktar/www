import React from "react";
import PropTypes from "prop-types";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";
import { getUserByUserNameSuccess } from "src/store/actions";
import { GetUserByUserName } from "src/pages/api/endpoints";
import wrapper from "store/configureStore";
import withSession from "../../lib/sessions";

const UserProfile = ({ userName, isLoggedIn }) => {
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
  withSession(async ({ store, req, query: { userName } }) => {
    const { isLoggedIn } = req.session.get("user");

    const userResult = await GetUserByUserName(userName);
    store.dispatch(getUserByUserNameSuccess(userResult));

    return {
      props: { isLoggedIn, userName }
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
