import React from "react";
// import { connect } from "react-redux";

import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import { FrontPageContainer, MainLayout } from "layouts";
import { getBaseUrl } from "helpers/url";
import { fetchUserExperiences } from "../store/actions";

const LandingPage = ({ user, status }) => (
  <MainLayout>
    <FrontPageContainer />
  </MainLayout>
);

LandingPage.getInitialProps = async (ctx) => {
  const { query, store, isServer } = ctx;

  store.dispatch(fetchUserExperiences("1"));

  if (query.id) {
    const response = await fetch(`${getBaseUrl(ctx)}/api/users/${query.id}`);
    const user = await response.json();
    return { user, status: response.status };
  }
  return { isServer };
};

LandingPage.propTypes = {
  user: PropTypes.object,
  status: PropTypes.number
};

LandingPage.defaultProps = {
  user: {},
  status: 0
};

export default LandingPage;
