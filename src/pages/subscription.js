/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
// import { useAuth } from "utils/auth";
// eslint-disable-next-line no-unused-vars
import { MainLayout, SubscriptionContainer } from "layouts";

const Subscription = ({ searchInput }) => {
  // const { isLoggedIn } = useAuth();
  return (
    <MainLayout>
      <SubscriptionContainer />
    </MainLayout>
  );
};

Subscription.getInitialProps = (ctx) => {
  const { searchInput } = ctx.query;
  return { searchInput };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Subscription;
