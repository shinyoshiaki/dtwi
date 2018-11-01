import React, { Component } from "react";
import { connect } from "react-redux";
import { initialState } from "../modules/condition";
import setFormDmChat from "../components/dm/chat";
import { sendComment } from "../modules/dm";

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

  sendComment = payload => {
    const { condition, p2p, dispatch } = this.props;
    sendComment(condition.dmUserId, payload.text, p2p.kad, dispatch, {
      file: payload.file
    });
  };

  render() {
    const { condition } = this.props;
    return (
      <div>
        {this.renderId(condition)}
        {setFormDmChat({}, { sendComment: this.sendComment })}
      </div>
    );
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
