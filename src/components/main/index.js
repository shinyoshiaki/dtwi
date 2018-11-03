import React, { Component, createContext } from "react";
import { header } from "./header";
import MainTimeLine from "../../containers/main/timeline";
import { createNodeList } from "../common/util/nodeList";
import { setDmList } from "./dmList";

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
            titles: ["timeline", "dm", "kademlia"],
            pages: [
              <MainTimeLine />,
              setDmList(val, func),
              createNodeList(val.kbuckets)
            ],
            nodeId: val.nodeId
          },
          {}
        )}
      </Provider>
    );
  }
}

export default function setMainContext(
  val = { kbuckets: [], nodeId: "", dmlist_messages: {} },
  func = {
    excuteTweet: () => {},
    reload: () => {},
    setFile: () => {},
    searchUser: () => {},
    toAccount: () => {},
    dmlist_onClickId: id => {}
  }
) {
  return <MainContext val={val} func={func} />;
}
