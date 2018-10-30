import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Istate } from "../../modules/twitter";
import { setTimeline } from "../../components/timelline";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class AccoutContext extends Component {
  render() {
    const { twitter, toMain } = this.props;
    return (
      <Provider value={{}}>
        <IconButton onClick={toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        {setTimeline(twitter[Istate.myTweets])}
      </Provider>
    );
  }
}

export default function setAccountContext(twitter, toMain) {
  return <AccoutContext twitter={twitter} toMain={toMain} />;
}
