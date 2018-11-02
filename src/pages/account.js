import React, { Component } from "react";
import { connect } from "react-redux";
import setAccountContext from "../components/account";
import { Istate } from "../modules/twitter";
import { Istate as condition } from "../modules/condition";
import { setValue } from "../modules/condition";

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

  onClickId = id => {
    const { dispatch, history, p2p } = this.props;
    if (id !== p2p.kad.nodeId) {
      setValue(condition.findUser, id, dispatch);
      history.push("/user");
    }
  };

  render() {
    const { twitter, p2p } = this.props;
    return (
      <div>
        {setAccountContext(
          { twitter: twitter, follows: twitter[Istate.followIds], p2p },
          { toMain: this.toMain, onClickId: this.onClickId }
        )}
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
