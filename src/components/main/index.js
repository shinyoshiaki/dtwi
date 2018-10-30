import React, { Component, createContext } from "react";
import { header } from "../header";
import MainTimeLine from "../../containers/main/timeline";
import { createNodeList } from "../util/nodeList";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class MainContext extends Component {
  render() {
    const { excuteTweet, kbuckets, reload,setFile } = this.props;
    return (
      <Provider value={{ excuteTweet, reload, setFile }}>
        {header(["one", "two"], [<MainTimeLine />, createNodeList(kbuckets)])}
      </Provider>
    );
  }
}

export default function setMainContext(excuteTweet, kbuckets, reload, setFile) {
  return (
    <MainContext
      excuteTweet={excuteTweet}
      kbuckets={kbuckets}
      reload={reload}
      setFile={setFile}
    />
  );
}
