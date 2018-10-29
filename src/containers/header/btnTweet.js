import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { withRouter } from "react-router";

export class BtnAccout extends Component {
  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };
  render() {
    return (
      <IconButton onClick={this.toAccout} style={{ marginLeft: "auto" }}>
        <AccountCircle />
      </IconButton>
    );
  }
}

export default withRouter(BtnAccout);
