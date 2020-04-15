/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { withAuth } from "utils/auth";
import { MainLayout, SearchContainer, UserLayout } from "layouts";

const Search = ({ isLoggedIn, searchInput }) => {
  return (
    <>
      {isLoggedIn ? (
        <UserLayout>
          <SearchContainer searchInput={searchInput} />
        </UserLayout>
      ) : (
        <MainLayout>
          <SearchContainer searchInput={searchInput} />
        </MainLayout>
      )}
    </>
  );
};

Search.getInitialProps = (ctx) => {
  const { searchInput } = ctx.query;
  return { searchInput };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default withAuth(Search);
