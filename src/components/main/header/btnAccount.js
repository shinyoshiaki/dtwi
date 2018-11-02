import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { withRouter } from "react-router";

export class BtnAccount extends Component {
  toAccount = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/account");
  };
  render() {
    return (
      <IconButton onClick={this.toAccount} style={{ marginLeft: "auto" }}>
        <AccountCircle />
      </IconButton>
    );
  }
}

export default withRouter(BtnAccount);
