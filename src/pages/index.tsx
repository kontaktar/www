import React from "react";
import PropTypes from "prop-types";
import { NextPage } from "next";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { GetSearchResult } from "pages/api/endpoints";
import { FrontPageContainer, MainLayout } from "layouts";
import { fetchSearchResultSuccess, updateLatestSearch } from "../store/actions";

const LandingPage: NextPage = () => {
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
