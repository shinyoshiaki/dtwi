import React from "react";
import { AppBar, Tabs, Tab, Toolbar } from "@material-ui/core";
import BtnAccount from "./btnAccount";
import setBtnOpenTweet from "./btnOpenTweet";
import BtnReloadTimeline from "../btnReloadTimeline";
import setFormSearchUser from "./formSearchUser";
import FormSearchUser from "./formSearchUser";

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
    const { value, func } = this.props;
    if (value && func) {
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
              {this.titles
                ? this.titles.map((v, i) => {
                    return <Tab label={v} key={i} />;
                  })
                : undefined}
            </Tabs>
            <BtnReloadTimeline />
            <FormSearchUser />
            <BtnAccount />
            {setBtnOpenTweet()}
          </Toolbar>
        </AppBar>
        {this.pages
          ? this.pages.map((v, i) => {
              return tab === i && v;
            })
          : undefined}
      </div>
    );
  }
}

export function header(
  value = { titles: [], pages: [], nodeId: "" },
  func = {}
) {
  return <Header value={value} func={func} />;
}
