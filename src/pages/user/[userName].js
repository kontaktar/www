import React from "react";
import PropTypes from "prop-types";
import { MainLayout, ProfileContainer } from "layouts";
import { getUserByUserName } from "src/store/actions";

const UserProfile = ({ userName }) => {
  console.log("User userName from pages/user: ", userName);
  return (
    <MainLayout>
      <ProfileContainer userName={userName} />
    </MainLayout>
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
  userName: PropTypes.string
};

UserProfile.defaultProps = {
  userName: ""
};

export default UserProfile;
