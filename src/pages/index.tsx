import React from "react";
import { NextPage } from "next";
import { wrapper } from "store";
import { fetchSearchResult } from "store/search";
import { withSession } from "lib/sessions";
import { FrontPageContainer, MainLayout } from "layouts";

const LandingPage: NextPage = () => {
  return (
    <MainLayout>
      <FrontPageContainer />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  withSession(async () => {
    await store.dispatch(fetchSearchResult(""));
  })
);

export default LandingPage;
