import React, { Component } from "react";
import setTweet from "./tweet";

export class Timeline extends Component {
  render() {
    const { tweets } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {tweets.map(v => {
          return setTweet(v.id, v.time, v.msg, { pic: v.pic });
        })}
      </div>
    );
  }
}

export function setTimeline(tweets = []) {
  return <Timeline tweets={tweets} />;
}
