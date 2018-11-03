import React, { Component } from "react";
import { IconButton, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import setImageTweet from "./picture";
import { Consumer } from ".";

export class Tweet extends Component {
  render() {
    const { tweet, index } = this.props;
    return (
      <Consumer>
        {context => {
          context = context || { func: { onClickId: () => {} }, val: {} };

          return (
            <div
              style={{
                border: "1px solid",
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#d6d7da",
                margin: 3
              }}
              key={index}
            >
              <IconButton onClick={this.toAccount}>
                <AccountCircle />
              </IconButton>
              <Button
                onClick={() => {
                  context.func.onClickId(tweet.id);
                }}
              >
                {tweet.id}
              </Button>
              <br />
              <div
                style={{ float: "right", marginRight: 20, marginBottom: 20 }}
              >
                {new Date(tweet.time).toString()}
              </div>
              <br />
              <div style={{ marginLeft: 50 }}>
                {tweet.msg}
                <br />
                {tweet.pic ? setImageTweet(tweet.pic) : undefined}
              </div>
              <br />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default function setTweet(tweet, index) {
  return <Tweet tweet={tweet} index={index} />;
}
