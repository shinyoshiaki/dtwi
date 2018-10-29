import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export class Account extends Component {
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

const mapStateToProps = state => {
  return {
    twitter: state.twitter
  };
};

export default connect(mapStateToProps)(Account);
