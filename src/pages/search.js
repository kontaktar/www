/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { GetSearchResult } from "src/pages/api/endpoints";
import { MainLayout, SearchContainer, UserLayout } from "layouts";
import withSession from "../lib/sessions";
import wrapper from "../store/configureStore";
import {
  fetchSearchResult,
  fetchSearchResultSuccess,
  updateLatestSearch
} from "../store/actions";

const Search = ({ searchInput, isLoggedIn }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSearch = async (params) => {
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
    dispatch(fetchSearchResult(""));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <MainLayout>
            <SearchContainer
              cardsToDisplay={
                !store.searches.isFetching &&
                store.searches.inputs &&
                store.searches.inputs[store.searches.latestInput]
              }
              searchInput={searchInput}
              onSearch={onSearch}
              onClearSearch={onClearSearch}
            />
          </MainLayout>
        </div>
      ) : (
        <div>
          <UserLayout>
            <SearchContainer
              cardsToDisplay={
                !store.searches.isFetching &&
                store.searches.inputs &&
                store.searches.inputs[store.searches.latestInput]
              }
              searchInput={searchInput}
              onSearch={onSearch}
              onClearSearch={onClearSearch}
            />
          </UserLayout>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, req, res, query: { searchInput = "" } }) => {
    const isLoggedIn = req.session.get("user")
      ? req.session.get("user").isLoggedIn
      : false;

    const searchResult = await GetSearchResult(searchInput);
    store.dispatch(updateLatestSearch(searchInput));
    store.dispatch(
      fetchSearchResultSuccess(searchInput, Object.values(searchResult))
    );

    return {
      props: { isLoggedIn, searchInput }
    };
  })
);

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
