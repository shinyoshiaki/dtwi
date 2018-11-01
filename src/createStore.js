import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";

import p2pReducer from "./modules/p2p";
import twitter from "./modules/twitter";
import condition from "./modules/condition";
import dm from "./modules/dm";

const history = createHistory();
const middleware = routerMiddleware(history);

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      p2p: p2pReducer,
      router: routerReducer,
      twitter,
      condition,
      dm
    }),
    applyMiddleware(thunk, logger, middleware)
  );

  return { store, history };
}
