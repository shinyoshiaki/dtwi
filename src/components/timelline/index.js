import React, { Component } from "react";
import setTweet from "./tweet";

export class Timeline extends Component {
  render() {
    const { timeline, opt } = this.props;
    console.log("timeline render", { timeline });
    return (
      <div style={{ width: "50%" }}>
        {timeline.map((v, i) => {
          return setTweet(v, i, opt);
        })}
      </div>
    );
  }
}

export function setTimeline(timeline=[], opt = { onClickId: () => {} }) {
  console.log("settimeline", { timeline });
  return <Timeline timeline={timeline} opt={opt} />;
}
