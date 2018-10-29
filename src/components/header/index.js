import React from "react";
import { AppBar, Tabs, Tab, Toolbar, Button } from "@material-ui/core";
import BtnAccout from "./btnAccount";
import setBtnOpenTweet from "./btnOpenTweet";

class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { pages, titles, excuteTweet } = this.props;
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
            <BtnAccout />
            {/* <Button style={{ marginLeft: "auto" }}>tweet</Button> */}
            {setBtnOpenTweet(excuteTweet)}
          </Toolbar>
        </AppBar>
        {pages.map((v, i) => {
          return value === i && v;
        })}
      </div>
    );
  }
}

export function header(titles = [], pages = [], excuteTweet) {
  return <Header titles={titles} pages={pages} excuteTweet={excuteTweet} />;
}
