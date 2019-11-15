/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
import { MainLayout, SearchContainer } from "layouts";

const Search = ({ searchInput }) => {
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
