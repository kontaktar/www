/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import cookie from "js-cookie";
// import nextCookie from "next-cookies";
import { useAuth } from "utils/auth";
// eslint-disable-next-line no-unused-vars
import { MainLayout, SearchContainer, UserLayout } from "layouts";

const Search = ({ searchInput, isLoggedIn }) => {
  // const { isLoggedIn } = useAuth();
  // console.log(cookie.get("spez_user_token"), isLoggedIn);
  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <MainLayout>
            <SearchContainer searchInput={searchInput} />
          </MainLayout>
        </div>
      ) : (
        <div>
          <UserLayout>
            <SearchContainer searchInput={searchInput} />
          </UserLayout>
        </div>
      )}
    </div>
  );
};

Search.getInitialProps = (ctx) => {
  const { searchInput } = ctx.query;
  const isLoggedIn = useAuth().isLoggedInServerSide(ctx);

  return { searchInput, isLoggedIn };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
