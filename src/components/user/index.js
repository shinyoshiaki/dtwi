import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { setTimeline } from "../../components/timelline";
import FormBadge from "./badge";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class UserContext extends Component {
  render() {
    const { timeline, toMain, follow, id } = this.props;
    return (
      <Provider value={{ follow, id }}>
        <IconButton onClick={toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        <FormBadge />
        {setTimeline(timeline)}
      </Provider>
    );
  }
}

export default function setUserContext(timeline, toMain, follow, id) {
  return (
    <UserContext timeline={timeline} toMain={toMain} follow={follow} id={id} />
  );
}
