import React, { Component } from "react";
import { connect } from "react-redux";
import { setTimeline } from "../../components/timelline";
import { setValue, Istate as condition } from "../../modules/condition";
import { withRouter } from "react-router";
import { findPicture } from "../../modules/twitter";

class MainTimeLine extends Component {
  onClickId = id => {
    const { dispatch, history } = this.props;
    setValue(condition.findUser, id, dispatch);
    history.push("/user");
  };

  render() {
    const { twitter, p2p } = this.props;
    console.log("timeline container render", { twitter });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {() => {
          console.log("timeline test", twitter.timeline);
        }}
        {setTimeline(
          twitter.timeline,
          { onClickId: this.onClickId },
          findPicture,
          p2p
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    twitter: state.twitter,
    p2p: state.p2p
  };
};

export default withRouter(connect(mapStateToProps)(MainTimeLine));
