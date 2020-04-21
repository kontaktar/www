/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { useAuth } from "utils/auth";
// eslint-disable-next-line no-unused-vars
import { MainLayout, SearchContainer, UserLayout } from "layouts";

const Search = ({ searchInput }) => {
  const { isLoggedIn } = useAuth();
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

export default Search;
