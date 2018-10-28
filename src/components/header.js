import React from "react";
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";

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
      <div>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            style={{ color: "black" }}
          >
            {titles.map(v => {
              return <Tab label={v} />;
            })}
          </Tabs>
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
