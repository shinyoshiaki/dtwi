import React, { Component, createContext } from "react";
import setTweet from "./tweet";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class Timeline extends Component {
  render() {
    const { timeline, func, p2p } = this.props;
    console.log("timeline render", { timeline });
    return (
      <Provider value={{ func, p2p }}>
        <div style={{ width: "50%" }}>
          {timeline.map((v, i) => {
            return setTweet(v, i);
          })}
        </div>
      </Provider>
    );
  }
}

export function setTimeline(
  timeline = [],
  p2p,
  func = {
    onClickId: () => {},
    findPicture: () => {}
  }
) {
  console.log("settimeline", { timeline });
  return (
    <Timeline
      timeline={timeline}
      p2p={p2p}
      func={func}            
    />
  );
}
