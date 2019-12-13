/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
import { isLoggedIn } from "utils/auth";

import { MainLayout, SearchContainer, UserLayout } from "layouts";

const Search = ({ searchInput }) => {
  if (isLoggedIn()) {
    return (
      <UserLayout>
        <SearchContainer searchInput={searchInput} />
      </UserLayout>
    );
  }
  return (
    <MainLayout>
      <SearchContainer searchInput={searchInput} />
    </MainLayout>
  );
};

Search.getInitialProps = (ctx) => {
  const { searchInput } = ctx.query;
  return { searchInput };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
