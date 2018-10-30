import React, { Component, createContext } from "react";
import { header } from "../header";
import MainTimeLine from "../../containers/main/timeline";
import { createNodeList } from "../util/nodeList";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class MainContext extends Component {
  render() {
    const { excuteTweet, kbuckets } = this.props;
    return (
      <Provider value={{ excuteTweet }}>
        {header(["one", "two"], [<MainTimeLine />, createNodeList(kbuckets)])}
      </Provider>
    );
  }
}

export default function setMainContext(excuteTweet, kbuckets) {
  return <MainContext excuteTweet={excuteTweet} kbuckets={kbuckets} />;
}
