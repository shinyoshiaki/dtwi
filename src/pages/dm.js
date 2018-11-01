import React, { Component } from "react";
import { connect } from "react-redux";
import { initialState } from "../modules/condition";

class DM extends Component {
  constructor(props) {
    super(props);
    const { p2p, history } = this.props;
    if (!p2p.kad) {
      history.push("/");
    }
  }

  renderId(condition = initialState) {
    return <div>{condition.dmUserId}</div>;
  }

  render() {
    const { condition } = this.props;
    return <div>{this.renderId(condition)}</div>;
  }
}

const mapStateToProps = state => {
  return {
    p2p: state.p2p,
    twitter: state.twitter,
    condition: state.condition
  };
};

export default connect(mapStateToProps)(DM);
