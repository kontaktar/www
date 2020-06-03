/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "utils/auth";
import { MainLayout, SearchContainer, UserLayout } from "layouts";
import { fetchSearchResult, updateLatestSearch } from "../store/actions";

const Search = ({ searchInput, isLoggedIn }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSearch = async (params) => {
    if (params && store.searches && store.searches[params]) {
      // Already in store, just update 'lastSearched'
      dispatch(updateLatestSearch(params));
    } else if (!params) {
      // TODO: do something better then just search for "a" as initial search.
      // Maybe search by newest
      dispatch(fetchSearchResult("a"));
    } else {
      dispatch(fetchSearchResult(params));
    }
  };

  const onClearSearch = () => {
    // TODO: Same as above
    dispatch(fetchSearchResult("a"));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <MainLayout>
            <SearchContainer
              cardsToDisplay={store.searches[store.searches.latestInput]}
              searchInput={searchInput}
              onSearch={onSearch}
              onClearSearch={onClearSearch}
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
  const {
    store,
    query: { searchInput = "" }
  } = ctx;
  const isLoggedIn = useAuth().isLoggedInServerSide(ctx);

  if (searchInput) {
    await store.dispatch(fetchSearchResult(searchInput));
  } else {
    const initalSearch = "a"; // TODO: Replace with some query that will find the first cards to show, i.e. payed for cards or something.
    await store.dispatch(fetchSearchResult(initalSearch));
  }

  return { searchInput, isLoggedIn, store };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
