/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { getBaseUrl } from "helpers/url";
import useAuth from "hooks/useAuth.tsx";
import { GetSearchResult } from "pages/api/endpoints";
// import useMaxWidth from "src/hooks/useMaxWidth";
import { FrontPageContainer, MainLayout } from "layouts";
import {
  fetchSearchResult,
  fetchSearchResultSuccess,
  fetchUserExperiences,
  updateLatestSearch
} from "../store/actions";

const LandingPage = () => {
  /* DEMO dispatch stuff */
  // const dispatch = useDispatch();
  // useEffect(() => {
  // dispatch(fetchUserExperiences("2"));
  // }, []);

  const store = useSelector((state) => state);

  return (
    <MainLayout>
      <FrontPageContainer />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store }) => {
    const searchResult = await GetSearchResult("");
    store.dispatch(updateLatestSearch(""));
    store.dispatch(fetchSearchResultSuccess("", Object.values(searchResult)));
  })
);

LandingPage.propTypes = {
  user: PropTypes.object,
  status: PropTypes.number
};

LandingPage.defaultProps = {
  user: {},
  status: 0
};

export default LandingPage;
