import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import { Consumer } from "./index";

export default class BtnReloadTimeline extends Component {
  toAccount = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/account");
  };
  render() {
    return (
      <Consumer>
        {context => {
          context = context || { func: { reload: () => {} }, val: {} };
          return (
            <IconButton
              onClick={() => {
                context.func.reload();
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
