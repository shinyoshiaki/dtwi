import React, { Component } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Consumer } from "../index";

export default class FormSearchUser extends Component {
  state = { target: "" };
  render() {
    return (
      <Consumer>
        {context => {
          context = context || {
            func: {
              searchUser: id => {
                console.log({ id });
              }
            }
          };
          return (
            <div>
              <InputBase
                placeholder="Search…"
                value={this.state.target}
                onChange={e => {
                  this.setState({ target: e.target.value });
                }}
                style={{ width: "20%" }}
              />
              <IconButton
                onClick={() => {
                  context.func.searchUser(this.state.target);
                  this.setState({ target: "" });
                }}
              >
                <Search />
              </IconButton>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
