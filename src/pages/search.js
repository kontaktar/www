/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
// import PropTypes from "prop-types";
import { useDispatch, useStore } from "react-redux";
import { useAuth } from "utils/auth";
import { MainLayout, SearchContainer, UserLayout } from "layouts";
import { fetchSearchResult } from "../store/actions";

const Search = ({ searchInput, isLoggedIn }) => {
  // const [cards, setCards] = useState([]);

  const dispatch = useDispatch();
  const store = useStore();

  const onSearch = async (params) => {
    if (store.getState().searches && store.getState().searches[params]) {
      console.log("skip searching, already in store");
      console.log("already in store", params, store.getState().searches);
    } else if (!params) {
      console.log("empty params");
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
              // cardsToDisplay={cards}
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
    query: { searchInput }
  } = ctx;
  const isLoggedIn = useAuth().isLoggedInServerSide(ctx);

  if (searchInput) {
    await store.dispatch(fetchSearchResult(searchInput));
  }

  return { searchInput, isLoggedIn, store };
};

// Search.propTypes = {
//   data: PropTypes.object.isRequired
// };

export default Search;
