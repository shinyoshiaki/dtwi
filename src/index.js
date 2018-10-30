import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";

import { HashRouter as Router, Route } from "react-router-dom";
import WatchLive from "./pages/main";
import Login from "./pages/login";
import Account from "./pages/accout";
import User from "./pages/user";

const data = createStore();

render(
  <Provider store={data.store}>
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={WatchLive} />
        <Route path="/accout" component={Account} />
        <Route path="/user" component={User} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
