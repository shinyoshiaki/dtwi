import React, { Component } from "react";
import { connect } from "react-redux";
import { findTweet, initialState, follow } from "../modules/twitter";
import setUserContext from "../components/user";
import { setConditionValue, Icondition } from "../modules/condition";

class User extends Component {
  constructor(props) {
    super(props);
    const { p2p, history } = this.props;
    if (!p2p.kad) {
      history.push("/");
    }
  }

  async componentDidMount() {
    const { condition, p2p, dispatch } = this.props;
    findTweet(condition.findUser, p2p.kad, dispatch);
  }

  toMain = () => {
    const { history } = this.props;
    if (history) history.push("/main");
  };

  toDm = id => {
    const { history, dispatch } = this.props;
    setConditionValue(Icondition.dmUserId, id, dispatch);
    if (history) history.push("/dm");
  };

  getTargetTweets(target, state = initialState) {
    const tweets = [];
    state.timeline.forEach(tweet => {
      if (tweet.id === target) {
        tweets.push(tweet);
      }
    });
    return tweets;
  }

  follow = id => {
    const { dispatch } = this.props;
    follow(id, dispatch);
  };

  render() {
    const { twitter, condition, p2p } = this.props;
    const tweets = this.getTargetTweets(condition.findUser, twitter);

    return (
      <div>
        {setUserContext(
          { timeline: tweets, id: condition.findUser, p2p },
          { toMain: this.toMain, follow: this.follow, toDm: this.toDm }
        )}
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

export default connect(mapStateToProps)(User);
