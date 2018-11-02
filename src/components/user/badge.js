import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Consumer } from "./index";

export default class FormBadge extends Component {
  toAccount = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/account");
  };

  render() {
    return (
      <Consumer>
        {context => {
          context = context || {
            func: { toDm: () => {}, follow: () => {} },
            val: { id: "" }
          };

          return (
            <div>
              <IconButton>
                <AccountCircle />
              </IconButton>
              <Button>{context.val.id}</Button>
              <br />
              <Button
                onClick={() => {
                  context.func.follow(context.val.id);
                }}
              >
                follow
              </Button>
              <Button
                onClick={() => {
                  context.func.toDm(context.val.id);
                }}
              >
                dm
              </Button>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
