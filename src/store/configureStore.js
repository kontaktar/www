import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const isServer = typeof window === "undefined";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const developmentMiddleware = [];
    if (isServer) {
      developmentMiddleware.push((_store) => (next) => (action) => {
        // eslint-disable-next-line no-console
        console.log("REDUX action type: ", action.type);
        next(action);
      });
    }
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(
      applyMiddleware(...[...middleware, ...developmentMiddleware])
    );
  }
  return applyMiddleware(...middleware);
};

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;
