import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { setTimeline } from "../../components/timelline";
import FormBadge from "./badge";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class UserContext extends Component {
  render() {
    const { timeline, toMain, follow, id, p2p } = this.props;
    return (
      <Provider value={{ follow, id }}>
        <IconButton onClick={toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        <div style={{ display: "flex" }}>
          <div style={{ width: 300 }}>
            <FormBadge />
          </div>
          <div style={{ flex: 1 }}>{setTimeline(timeline, p2p)}</div>
        </div>
      </Provider>
    );
  }
}

export default function setUserContext(timeline=[], toMain, follow, id, p2p) {
  return (
    <UserContext
      timeline={timeline}
      toMain={toMain}
      follow={follow}
      id={id}
      p2p={p2p}
    />
  );
}
