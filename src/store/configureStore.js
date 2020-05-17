import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export const wrapper = createWrapper(configureStore, { debug: true });
export default configureStore;
