import React from "react";
import PropTypes from "prop-types";
import { withAuth } from "utils/auth";
import { MainLayout, ProfileContainer, UserLayout } from "layouts";
import { getUserByUserName } from "src/store/actions";

const UserProfile = ({ userName, isLoggedIn }) => {
  console.log("User userName from pages/user: ", userName);
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

UserProfile.getInitialProps = async (ctx) => {
  const {
    query: { userName },
    store
  } = ctx;
  await store.dispatch(getUserByUserName(userName));

  return { userName };
};

UserProfile.propTypes = {
  userName: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
};

UserProfile.defaultProps = {
  userName: ""
};

export default withAuth(UserProfile);
