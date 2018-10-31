import React, { Component, createContext } from "react";
import setTweet from "./tweet";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class Timeline extends Component {
  render() {
    const { timeline, opt, findPicture, p2p } = this.props;
    console.log("timeline render", { timeline });
    return (
      <Provider value={{ findPicture, p2p }}>
        <div style={{ width: "50%" }}>
          {timeline.map((v, i) => {
            return setTweet(v, i, opt);
          })}
        </div>
      </Provider>
    );
  }
}

export function setTimeline(
  timeline = [],
  opt = { onClickId: () => {} },
  findPicture,
  p2p
) {
  console.log("settimeline", { timeline });
  return (
    <Timeline
      timeline={timeline}
      opt={opt}
      findPicture={findPicture}
      p2p={p2p}
    />
  );
}
