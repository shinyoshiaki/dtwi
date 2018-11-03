import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class DmList extends Component {
  messages = {};
  toDm = id => {};

  render() {
    const { val, func } = this.props;
    if (val && func) {
      this.messages = val.dmlist_messages;
      this.toDm = func.toDm;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "50%",
            border: "1px solid",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
        >
          <div>dm list</div>
          {Object.keys(this.messages).map((key, i) => {
            const message = this.messages[key];
            return (
              <div key={i}>
                <Button
                  onClick={() => {
                    this.toDm(key);
                  }}
                >
                  {key}
                </Button>
                <br />
                {message[message.length - 1].text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export function setDmList(
  val = { dmlist_messages: {} },
  func = {
    toDm: id => {}
  }
) {
  console.log("setdmlist", { val }, { func });
  return <DmList val={val} func={func} />;
}
