import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Consumer } from "../index";

export default class BtnAccount extends Component {
  render() {
    return (
      <Consumer>
        {context => {
          context = context || {
            func: {
              toAccount: () => {}
            }
          };
          return (
            <IconButton
              onClick={context.func.toAccount}
              style={{ marginLeft: "auto" }}
            >
              <AccountCircle />
            </IconButton>
          );
        }}
      </Consumer>
    );
  }
}
