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
    console.log("Store", store);
    if (params && store.searches.inputs && store.searches.inputs[params]) {
      // Already in store, just update 'lastSearched'
      dispatch(updateLatestSearch(params));
    } else if (!params) {
      // TODO: Maybe search for newest or sponsored when search input is empty?
      dispatch(fetchSearchResult(""));
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
              cardsToDisplay={store.searches.inputs[store.searches.latestInput]}
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

  await store.dispatch(fetchSearchResult(searchInput || ""));

  return { searchInput, isLoggedIn, store };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
