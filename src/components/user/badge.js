import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Consumer } from "./index";

export default class FormBadge extends Component {
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
            <div>
              <IconButton>
                <AccountCircle />
              </IconButton>
              <Button>{context ? context.id : "null"}</Button>
              <br />
              <Button
                onClick={() => {
                  if (context) context.follow(context.id);
                }}
              >
                follow
              </Button>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
