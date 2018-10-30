import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import { Consumer } from "./index";

export default class BtnReloadTimeline extends Component {
  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };
  render() {
    return (
      <Consumer>
        {context => {
          return (
            <IconButton
              onClick={() => {
                if (context) context.reload();
              }}
              style={{ marginLeft: "auto" }}
            >
              <Autorenew />
            </IconButton>
          );
        }}
      </Consumer>
    );
  }
}
