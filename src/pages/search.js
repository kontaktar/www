/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout, SearchContainer, UserLayout } from "layouts";
import withSession from "../lib/sessions";
import wrapper from "../store/configureStore";
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

// Search.getInitialProps = withSession(async (ctx) => {
//   const {
//     req,
//     store,
//     query: { searchInput = "" }
//   } = ctx;
//   await store.dispatch(fetchSearchResult(searchInput));

//   return {
//     isLoggedIn: req.session.get("user").isLoggedIn,
//     searchInput,
//     store
//   };
// });

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, req, res, query }) => {
    // console.log("req", req);
    console.log("store", store.getState());
    console.log("user", req.session.get("user"));
    const isLoggedIn = req.session.get("user")
      ? req.session.get("user").isLoggedIn
      : false;
    // console.log(req)
    // const isLoggedIn =
    // req.session.get("user") && req.session.get("user").isLoggedIn;

    // if (user === undefined) {
    //   res.setHeader("location", "/login");
    //   res.statusCode = 302;
    //   res.end();
    //   return { props: {} };
    // }

    return {
      props: { isLoggedIn, searchInput: query.searchInput || "" }
    };
  })
);

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
