import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { setTimeline } from "../../components/timelline";
import FormBadge from "./badge";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class UserContext extends Component {
  render() {
    const { value, func } = this.props;
    return (
      <Provider value={{ func, value }}>
        <IconButton onClick={func.toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        <div style={{ display: "flex" }}>
          <div style={{ width: 500 }}>
            <FormBadge />
          </div>
          <div style={{ flex: 1 }}>
            {setTimeline(value.timeline, value.p2p)}
          </div>
        </div>
      </Provider>
    );
  }
}

export default function setUserContext(
  value = { timeline: [], id: "", p2p: undefined },
  func = { toMain: () => {}, follow: () => {}, toDm: () => {} }
) {
  return <UserContext value={value} func={func} />;
}
