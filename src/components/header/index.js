import React from "react";
import { AppBar, Tabs, Tab, Toolbar, Button } from "@material-ui/core";
import BtnAccount from "./btnAccount";
import setBtnOpenTweet from "./btnOpenTweet";
import BtnReloadTimeline from "../main/btnReloadTimeline";

class Header extends React.Component {
  state = {
    tab: 0
  };

  handleChange = (event, tab) => {
    this.setState({ tab });
  };

  titles = [];
  nodeId = "";
  pages = [];

  render() {
    const { value } = this.props;
    if (value) {
      this.titles = value.titles;
      this.pages = value.pages;
      this.nodeId = value.nodeId;
    }
    const { tab } = this.state;

    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <Tabs
              value={tab}
              onChange={this.handleChange}
              style={{ color: "black" }}
            >
              {this.titles.map((v, i) => {
                return <Tab label={v} key={i} />;
              })}
            </Tabs>
            <BtnReloadTimeline />
            <div style={{ color: "black" }}> {this.nodeId}</div>
            <BtnAccount />
            {setBtnOpenTweet()}
          </Toolbar>
        </AppBar>
        {this.pages.map((v, i) => {
          return tab === i && v;
        })}
      </div>
    );
  }
}

export function header(value = { titles: [], pages: [], nodeId: "" }) {
  return <Header value={value} />;
}
