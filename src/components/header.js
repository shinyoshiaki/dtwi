import React from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Button,
  IconButton
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import BtnAccout from "./header/btnAccount";

class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { pages, titles } = this.props;
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
            <Button style={{ marginLeft: "auto" }}>tweet</Button>
          </Toolbar>
        </AppBar>
        {pages.map((v, i) => {
          return value === i && v;
        })}
      </div>
    );
  }
}

export function header(titles = [], pages = []) {
  return <Header titles={titles} pages={pages} />;
}
