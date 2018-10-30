import React, { Component } from "react";
import setTweet from "./tweet";

export class Timeline extends Component {
  render() {
    const { tweets, opt } = this.props;
    console.log("timeline render", { opt });
    return (
      <div style={{ width: "50%" }}>
        {tweets.map((v, i) => {
          return setTweet(v, i, opt);
        })}
      </div>
    );
  }
}

export function setTimeline(tweets = [], opt = { onClickId: () => {} }) {
  return <Timeline tweets={tweets} opt={opt} />;
}
