import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Istate } from "../modules/twitter";
import { setTimeline } from "../components/timelline";

class Account extends Component {
  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };
  render() {
    const { twitter } = this.props;
    console.log({ twitter }, this.props);
    return (
      <div>
        <IconButton onClick={this.toAccout} style={{ marginLeft: "auto" }}>
          <AccountCircle />
        </IconButton>
        {setTimeline(twitter[Istate.myTweets])}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p2p: state.p2p,
    twitter: state.twitter
  };
};

export default connect(mapStateToProps)(Account);
