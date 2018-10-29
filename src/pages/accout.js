import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Istate as state } from "../modules/twitter";
import { setTimeline } from "../components/timelline";

export class Account extends Component {
  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };
  render() {
    let { twitter } = this.props;

    return (
      <div>
        <IconButton onClick={this.toAccout} style={{ marginLeft: "auto" }}>
          <AccountCircle />
        </IconButton>
        {setTimeline(twitter[state.myTweets])}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    twitter: state.twitter
  };
};

export default connect(mapStateToProps)(Account);
