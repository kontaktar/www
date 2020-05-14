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

  /* TODO: fetch data client side */

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

Search.getInitialProps = async (ctx) => {
  const { searchInput } = ctx.query;
  const isLoggedIn = useAuth().isLoggedInServerSide(ctx);

  // TODO: Move this elsewhere:
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = process.browser
    ? `${protocol}://${window.location.host}`
    : `${protocol}://${ctx.req.headers.host}`;

  // TODO: This works, do something with the data:
  if (searchInput) {
    const response = await fetch(`${baseUrl}/api/search/${searchInput}`);
    const allCards = await response.json();
    return { allCards, status: response.status };
  }

  return { searchInput, isLoggedIn };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
