import React, { Component } from "react";
import { connect } from "react-redux";
import { initialState } from "../modules/condition";
import setFormDmChat from "../components/dm/chat";
import { sendComment } from "../modules/dm";
import Kademlia from "kad-rtc";
import { toMain } from "../domain/route";

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
    console.log("sendcomment", { payload });
    sendComment(condition.dmUserId, payload.text, p2p.kad, dispatch, {
      file: payload.file,
      filename: payload.filename
    });
  };

  toMain = () => {
    toMain(this.props);
  };

  render() {
    const { condition, dm, p2p } = this.props;
    const getPeer = (kad = new Kademlia(), id) => {
      return kad.f.getPeerFromnodeId(id);
    };
    return (
      <div>
        {this.renderId(condition)}
        {setFormDmChat(
          {
            messages: dm.messages,
            nodeId: condition.dmUserId,
            chat_peer: getPeer(p2p.kad, condition.dmUserId)
          },
          { sendComment: this.sendComment, toMain: this.toMain }
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p2p: state.p2p,
    twitter: state.twitter,
    condition: state.condition,
    dm: state.dm
  };
};

export default connect(mapStateToProps)(DM);
