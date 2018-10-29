import React, { Component } from "react";
import { connect } from "react-redux";
import { setTimeline } from "../../components/timelline";
import { Istate } from "../../modules/twitter";

class MainTimeLine extends Component {
  render() {
    const { twitter } = this.props;
    console.log({ twitter }, this.props);
    return <div>{setTimeline(twitter[Istate.tweets])}</div>;
  }
}

const mapStateToProps = state => {
  return {
    twitter: state.twitter
  };
};

export default connect(mapStateToProps)(MainTimeLine);
