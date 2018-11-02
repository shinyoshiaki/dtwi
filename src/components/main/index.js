import React, { Component, createContext } from "react";
import { header } from "./header";
import MainTimeLine from "../../containers/main/timeline";
import { createNodeList } from "../common/util/nodeList";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class MainContext extends Component {
  render() {
    const { val, func } = this.props;

    console.log("main index", this.props);
    return (
      <Provider value={{ val, func }}>
        {header(
          {
            titles: ["timeline", "kademlia"],
            pages: [<MainTimeLine />, createNodeList(val.kbuckets)],
            nodeId: val.nodeId
          },
          {}
        )}
      </Provider>
    );
  }
}

export default function setMainContext(
  val = { kbuckets: [], nodeId: "" },
  func = {
    excuteTweet: () => {},
    reload: () => {},
    setFile: () => {},
    searchUser: () => {},
    toAccount: () => {}
  }
) {
  return <MainContext val={val} func={func} />;
}
