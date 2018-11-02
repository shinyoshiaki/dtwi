import React, { Component } from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Consumer } from "../index";

export class FormSearchUser extends Component {
  searchUser = id => {
    console.log({ id });
  };
  state = { target: "" };
  render() {
    const { func } = this.props;
    if (func) {
      this.searchUser = func.searchUser;
    }
    return (
      <Consumer>
        {context => {
          context = context || { func: {}, val: { p2p: {} } };
          return (
            <div>
              <InputBase
                placeholder="Search…"
                value={this.state.target}
                onChange={e => {
                  this.setState({ target: e.target.value });
                }}
              />
              <IconButton
                onClick={() => {
                  this.searchUser(this.state.target);
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

export default function setFormSearchUser(
  value = {},
  func = {
    searchUser: id => {
      console.log({ id });
    }
  }
) {
  return <FormSearchUser value={value} func={func} />;
}
