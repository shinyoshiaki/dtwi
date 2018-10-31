import React from "react";
import { AppBar, Tabs, Tab, Toolbar, Button } from "@material-ui/core";
import BtnAccout from "./btnAccount";
import setBtnOpenTweet from "./btnOpenTweet";
import BtnReloadTimeline from "../main/btnReloadTimeline";

class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { pages, titles, nodeId } = this.props;
    const { value } = this.state;

    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <Tabs
              value={value}
              onChange={this.handleChange}
              style={{ color: "black" }}
            >
              {titles.map((v, i) => {
                return <Tab label={v} key={i} />;
              })}
            </Tabs>
            <BtnReloadTimeline />
            <div style={{ color: "black" }}> {nodeId}</div>
            <BtnAccout />
            {setBtnOpenTweet()}
          </Toolbar>
        </AppBar>
        {pages.map((v, i) => {
          return value === i && v;
        })}
      </div>
    );
  }
}

export function header(titles = [], pages = [], nodeId) {
  return <Header titles={titles} pages={pages} nodeId={nodeId} />;
}
