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
  // const [cards, setCards] = useState([]);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // const store = useStore();

  const onSearch = async (params) => {
    console.log("store", store);
    if (params && store.searches && store.searches[params]) {
      // console.log("skip searching, already in store");
      // console.log("already in store", params, store.getState().searches);
      dispatch(updateLatestSearch(params));
    } else if (!params) {
      dispatch(fetchSearchResult("a"));
    } else {
      dispatch(fetchSearchResult(params));
    }
    // setCards([]);
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
