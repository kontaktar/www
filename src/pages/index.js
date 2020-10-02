/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getBaseUrl } from "helpers/url";
import { FrontPageContainer, MainLayout } from "layouts";
// import useMaxWidth from "src/hooks/useMaxWidth";
import { fetchUserExperiences } from "../store/actions";

const LandingPage = () => {
  /* DEMO dispatch stuff */
  // const dispatch = useDispatch();
  // useEffect(() => {
  // dispatch(fetchUserExperiences("2"));
  // }, []);

  const store = useSelector(state => state);
  console.log("store", store);

  return (
    <MainLayout>
      <FrontPageContainer />
    </MainLayout>
  );
};

// LandingPage.getInitialProps = async (ctx) => {
//   const { query, isServer, store } = ctx;

//   /* DEMO */
//   await store.dispatch(fetchUserExperiences("1"));

//   if (query.id) {
//     const response = await fetch(`${getBaseUrl(ctx)}/api/users/${query.id}`);
//     const user = await response.json();
//     return { user, status: response.status };
//   }
//   return { isServer };
// };

LandingPage.propTypes = {
  user: PropTypes.object,
  status: PropTypes.number
};

LandingPage.defaultProps = {
  user: {},
  status: 0
};

export default LandingPage;
