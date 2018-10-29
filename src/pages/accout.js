import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Istate } from "../modules/twitter";
import { setTimeline } from "../components/timelline";

class Account extends Component {
  constructor(props) {
    super(props);
    const { p2p, history } = this.props;
    if (!p2p.kad) {
      history.push("/");
    }
  }

  toMain = () => {
    const { history } = this.props;
    if (history) history.push("/main");
  };
  render() {
    const { twitter } = this.props;
    console.log({ twitter }, this.props);
    return (
      <div>
        <IconButton onClick={this.toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
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
