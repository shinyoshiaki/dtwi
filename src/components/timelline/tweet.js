import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export class Tweet extends Component {
  render() {
    const { tweet, index, opt } = this.props;
    console.log("tweet.js", { tweet }, { opt });
    return (
      <div
        style={{
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da",
          margin: 3
        }}
        id={index}
      >
        <IconButton onClick={this.toAccout}>
          <AccountCircle />
        </IconButton>
        <Button
          onClick={() => {
            opt.onClickId(tweet.id);
          }}
        >
          {tweet.id}
        </Button>
        <br />
        <div style={{ float: "right", marginRight: 20, marginBottom: 20 }}>
          {new Date(tweet.time).toString()}
        </div>
        <br />
        <div style={{ marginLeft: 50 }}>
          {tweet.msg}
          {tweet.pic}
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

export default function setTweet(tweet, index, opt = { onClickId: () => {} }) {
  return <Tweet tweet={tweet} index={index} opt={opt} />;
}
