import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Istate } from "../../modules/twitter";
import { setTimeline } from "../../components/common/timelline";
import { setFollowList } from "./followList";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class AccountContext extends Component {
  twitter = [];
  toMain = () => {};

  render() {
    const { value, func } = this.props;
    if (value && func) {
      this.twitter = value.twitter;
      this.toMain = func.toMain;
    }
    return (
      <div>
        <IconButton onClick={this.toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        <div style={{ display: "flex" }}>
          <div style={{ width: 500 }}>{setFollowList(value, func)}</div>
          <div style={{ flex: 1 }}>
            {setTimeline(this.twitter[Istate.myTweets], value.p2p)}
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default function setAccountContext(
  value = { twitter: [], follows: [], p2p: {} },
  func = { toMain: () => {}, onClickId: () => {} }
) {
  return <AccountContext value={value} func={func} />;
}
