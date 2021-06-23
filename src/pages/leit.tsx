import React from "react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "store/configureStore";
import { GetSearchResult } from "lib/endpoints";
import withSession from "lib/sessions";
import { randomize } from "helpers/arrays";
import { debugError } from "helpers/debug";
import useAuth from "hooks/useAuth";
import { MainLayout, SearchContainer, UserLayout } from "layouts";
import {
  fetchSearchResult,
  fetchSearchResultSuccess,
  updateLatestSearch
} from "../store/actions";

type Props = {
  // From getServerSideProps
  searchInput?: string;
};
const Search: NextPage<Props> = ({ searchInput }) => {
  const { isLoggedIn } = useAuth();
  const storeSearches = useSelector((state) => state.searches);
  const dispatch = useDispatch();

  const onSearch = async (params) => {
    if (params && storeSearches.inputs && storeSearches.inputs[params]) {
      // Already in store, just update 'lastSearched'
      dispatch(updateLatestSearch(params));
    } else if (!params) {
      // TODO: Maybe search for newest or sponsored when search input is empty?
      dispatch(fetchSearchResult(""));
    } else {
      dispatch(fetchSearchResult(params));
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <MainLayout>
            <SearchContainer
              cardsToDisplay={
                !storeSearches.isFetching &&
                storeSearches?.inputs?.[storeSearches?.latestInput]
              }
              searchInput={searchInput}
              onSearch={onSearch}
            />
          </MainLayout>
        </div>
      ) : (
        <div>
          <UserLayout>
            <SearchContainer
              cardsToDisplay={
                !storeSearches.isFetching &&
                storeSearches?.inputs?.[storeSearches?.latestInput]
              }
              searchInput={searchInput}
              onSearch={onSearch}
            />
          </UserLayout>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, query: { searchInput = "" } }) => {
    const searchDecoded = decodeURIComponent(searchInput);
    try {
      const searchResult = Object.values(await GetSearchResult(searchDecoded));

      store.dispatch(updateLatestSearch(searchDecoded));

      store.dispatch(
        fetchSearchResultSuccess(
          searchDecoded,
          searchInput === "" ? randomize(searchResult) : searchResult
        )
      );
    } catch (error) {
      debugError(`Error fetching search results: ${error}`);
    }
    return {
      props: { searchInput: searchDecoded }
    };
  })
);

export default Search;
