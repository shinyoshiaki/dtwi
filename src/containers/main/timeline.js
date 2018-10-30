import React, { Component } from "react";
import { connect } from "react-redux";
import { setTimeline } from "../../components/timelline";
import { Istate } from "../../modules/twitter";
import { setValue, Istate as condition } from "../../modules/condition";
import { withRouter } from "react-router";

class MainTimeLine extends Component {
  onClickId = id => {
    const { dispatch, history } = this.props;
    setValue(condition.findUser, id, dispatch);
    history.push("/user");
  };

  render() {
    const { twitter } = this.props;
    console.log({ twitter }, this.props);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",          
        }}
      >
        {setTimeline(twitter[Istate.tweets], { onClickId: this.onClickId })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    twitter: state.twitter
  };
};

export default withRouter(connect(mapStateToProps)(MainTimeLine));
