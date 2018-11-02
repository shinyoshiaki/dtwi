import React, { Component, createContext } from "react";
import { header } from "../header";
import MainTimeLine from "../../containers/main/timeline";
import { createNodeList } from "../util/nodeList";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class MainContext extends Component {
  excuteTweet = () => {};
  reload = () => {};
  setFile = () => {};
  kbuckets = [];
  nodeId = "";

  render() {
    const { value, func } = this.props;
    if (value && func) {
      this.kbuckets = value.kbuckets;
      this.nodeId = value.nodeId;
      this.excuteTweet = func.excuteTweet;
      this.reload = func.reload;
      this.setFile = func.setFile;
    }
    console.log("main index", this.props);
    return (
      <Provider
        value={{
          excuteTweet: this.excuteTweet,
          reload: this.reload,
          setFile: this.setFile
        }}
      >
        {header({
          titles: ["timeline", "kademlia"],
          pages: [<MainTimeLine />, createNodeList(this.kbuckets)],
          nodeId: this.nodeId
        })}
      </Provider>
    );
  }
}

export default function setMainContext(
  value = { kbuckets: [], nodeId: "" },
  func = { excuteTweet: () => {}, reload: () => {}, setFile: () => {} }
) {
  return <MainContext value={value} func={func} />;
}
