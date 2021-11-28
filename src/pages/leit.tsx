import React from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "store";
import { wrapper } from "store";
import { fetchSearchResult, updateLatestSearch } from "store/search";
import { GetSearchResult } from "lib/endpoints";
import { withSession } from "lib/sessions";
import useUser from "lib/useUser";
import { randomize } from "helpers/arrays";
import { debugError } from "helpers/debug";
import { MainLayout, SearchContainer, UserLayout } from "layouts";

type Props = {
  // From getServerSideProps
  searchInput?: string;
};
const Search: NextPage<Props> = ({ searchInput }) => {
  const { user } = useUser();

  const storeSearches = useAppSelector((state) => (state as any).searches);
  console.log("storeSearch", storeSearches);
  const dispatch = useAppDispatch();

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
      {!user?.isLoggedIn ? (
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

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  withSession(async ({ query: { searchInput = "" } }) => {
    const searchDecoded = decodeURIComponent(searchInput);
    try {
      await store.dispatch(fetchSearchResult(searchDecoded));
      // TODO: Randomize in db lookup like I was doing before?

      // const searchResult = Object.values(await GetSearchResult(searchDecoded));

      // store.dispatch(updateLatestSearch(searchDecoded));

      // store.dispatch(
      //     searchDecoded,
      //     searchInput === "" ? randomize(searchResult) : searchResult
      //   )
      // );
    } catch (error) {
      debugError(`Error fetching search results: ${error}`);
    }
    return {
      props: { searchInput: searchDecoded }
    };
  })
);

export default Search;
