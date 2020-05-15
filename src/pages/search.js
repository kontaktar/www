/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
// import PropTypes from "prop-types";
import { getBaseUrl } from "helpers/url";
import { useAuth } from "utils/auth";
// eslint-disable-next-line no-unused-vars
import { MainLayout, SearchContainer, UserLayout } from "layouts";

const Search = ({ searchInput, isLoggedIn }) => {
  const [cards, setCards] = useState([]);

  // same call is being called multiple time
  const onSearch = async (params) => {
    const response = await fetch(`${getBaseUrl()}/api/search/${params}`);
    setCards(await response.json());
    console.log(cards);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <MainLayout>
            <SearchContainer
              cardsToDisplay={cards}
              searchInput={searchInput}
              onSearch={onSearch}
            />
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

  // TODO: This works, do something with the data:
  if (searchInput) {
    const response = await fetch(
      `${getBaseUrl(ctx)}/api/search/${searchInput}`
    );
    const allCards = await response.json();
    return { allCards, status: response.status };
  }

  return { searchInput, isLoggedIn };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
