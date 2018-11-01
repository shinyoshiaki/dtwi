import React, { Component } from "react";
import { connect } from "react-redux";
import { setTimeline } from "../../components/timelline";
import { setValue, Istate as condition } from "../../modules/condition";
import { withRouter } from "react-router";

class MainTimeLine extends Component {
  onClickId = id => {
    const { dispatch, history, p2p } = this.props;
    if (id !== p2p.kad.nodeId) {
      setValue(condition.findUser, id, dispatch);
      history.push("/user");
    } else {
      history.push("/account");
    }
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
        {setTimeline(twitter.timeline, p2p, {
          onClickId: this.onClickId
        })}
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
