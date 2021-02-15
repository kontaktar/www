/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
// import PropTypes from "prop-types";
import { randomize } from "helpers/arrays";
import useAuth from "hooks/useAuth.tsx";
import { GetSearchResult } from "pages/api/endpoints";
import { MainLayout, SearchContainer, UserLayout } from "layouts";
import {
  fetchSearchResult,
  fetchSearchResultSuccess,
  updateLatestSearch
} from "../store/actions";

const Search = ({ searchInput }) => {
  const { isLoggedIn } = useAuth();
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

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, query: { searchInput = "" } }) => {
    try {
      const searchResult = Object.values(
        await GetSearchResult(decodeURIComponent(searchInput))
      );

      store.dispatch(updateLatestSearch(decodeURIComponent(searchInput)));

      store.dispatch(
        fetchSearchResultSuccess(
          decodeURIComponent(searchInput),
          searchInput === "" ? randomize(searchResult) : searchResult
        )
      );
    } catch (error) {
      console.error("error fetching search results", error);
    }
    return {
      props: { searchInput: decodeURIComponent(searchInput) }
    };
  })
);

export default Search;
