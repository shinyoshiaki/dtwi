import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export class Tweet extends Component {
  render() {
    const { id, time, msg, pic } = this.props;
    return (
      <div
        style={{
          width: "70%",
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3
          //   background: "#639"
        }}
      >
        <IconButton onClick={this.toAccout}>
          <AccountCircle />
        </IconButton>
        <Button>{id}</Button>
        {time}
        <br />
        <div style={{ marginLeft: 50 }}>
          {msg}
          {pic}
        </div>
        <br />
        <Button>name</Button>
        <Button>name</Button>
        <Button>name</Button>
        <br />
      </div>
    );
  }
}

export default function setTweet(id, time, msg, opt = { pic: undefined }) {
  return <Tweet id={id} time={time} msg={msg} pic={opt.pic} />;
}
