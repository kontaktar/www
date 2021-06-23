import React from "react";
import { NextPage } from "next";
import { useAuthUser } from "next-firebase-auth";
import wrapper from "store/configureStore";
import { GetSearchResult } from "lib/endpoints";
import withSession from "lib/sessions";
import { FrontPageContainer, MainLayout } from "layouts";
import { fetchSearchResultSuccess, updateLatestSearch } from "../store/actions";

const LandingPage: NextPage = () => {
  const firebaseUser = useAuthUser();
  // eslint-disable-next-line no-console
  console.log("firebaseUser", firebaseUser);
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

export default LandingPage;
