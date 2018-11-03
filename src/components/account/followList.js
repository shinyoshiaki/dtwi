import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class FollowList extends Component {
  follows = [];
  onClickId = id => {
    console.log({ id });
  };

  render() {
    const { value, func } = this.props;
    if (value && func) {
      this.follows = value.follows;
      this.onClickId = func.onClickId;
    }

    return (
      <div
        style={{          
          textAlign: "center",
          border: "1px solid",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: "#d6d7da"
        }}
      >
        <div>follow list</div>
        {this.follows.map((v, i) => {
          return (
            <div>
              <Button
                onClick={() => {
                  this.onClickId(v);
                }}
                key={i}
                style={{ width: "90%" }}
              >
                {v}
              </Button>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export function setFollowList(
  value = { follows: [] },
  func = {
    onClickId: id => {
      console.log({ id });
    }
  }
) {
  return <FollowList value={value} func={func} />;
}
