import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Consumer } from "./index";

export default class FormBadge extends Component {
  toDm = id => {};
  follow = () => {};
  userId = "";

  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };

  render() {
    return (
      <Consumer>
        {context => {
          if (context) {
            this.userId = context.value.id;
            this.toDm = context.func.toDm;
            this.follow = context.func.follow;
          }

          return (
            <div>
              <IconButton>
                <AccountCircle />
              </IconButton>
              <Button>{this.userId}</Button>
              <br />
              <Button
                onClick={() => {
                  this.follow(this.userId);
                }}
              >
                follow
              </Button>
              <Button
                onClick={() => {
                  this.toDm(this.userId);
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
