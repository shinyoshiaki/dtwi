import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class DmList extends Component {
  messages = {};
  onClickId = id => {};

  render() {
    const { val, func } = this.props;
    if (val && func) {
      this.messages = val.dmlist_messages;
      this.onClickId = func.dmlist_onClickId;
    }

    return (
      <div style={{ width: 200 }}>
        <div>dm list</div>
        {Object.keys(this.messages).map((key, i) => {
          const message = this.messages[key];
          return (
            <div key={i}>
              <Button
                onClick={() => {
                  this.onClickId(key);
                }}
              >
                {key}
              </Button>
              {message[message.length - 1].text}
            </div>
          );
        })}
      </div>
    );
  }
}

export function setDmList(
  val = { dmlist_messages: {} },
  func = {
    dmlist_onClickId: id => {}
  }
) {
  console.log("setdmlist", { val }, { func });
  return <DmList val={val} func={func} />;
}
