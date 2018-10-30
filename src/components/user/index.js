import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { setTimeline } from "../../components/timelline";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class UserContext extends Component {
  render() {
    const { tweets, toMain } = this.props;
    return (
      <Provider value={{}}>
        <IconButton onClick={toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        {setTimeline(tweets)}
      </Provider>
    );
  }
}

export default function setUserContext(tweets, toMain) {
  return <UserContext tweets={tweets} toMain={toMain} />;
}
