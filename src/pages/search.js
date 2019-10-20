/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
import { MainLayout, SearchContainer } from "layouts";

const Search = () => {
  return (
    <MainLayout>
      <SearchContainer />
    </MainLayout>
  );
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
