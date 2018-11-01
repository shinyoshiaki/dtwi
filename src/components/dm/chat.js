import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { TextField, Button } from "@material-ui/core";
import setBtnPicFile, { BtnPicFile } from "../header/btnPicFile";
const loremIpsum = require("lorem-ipsum");
const moment = require("moment");
const Identicon = require("identicon.js");

export class FormDmChat extends Component {
  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };

  state = {
    messageList: [
      {
        position: "right",
        type: "text",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        date: new Date()
      },
      {
        position: "left",
        title: "test",
        type: "photo",
        status: "sent",
        view: "list",
        data: { uri: `data:image/png;base64,${this.photo(150)}` },
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        date: new Date(),
        dateString: moment(new Date()).format("HH:mm")
      }
    ]
  };

  photo(size) {
    return new Identicon(String(Math.random()) + String(Math.random()), {
      margin: 0,
      size: size || 20
    }).toString();
  }

  sendComment = () => {};
  text = "";
  selectFile;

  render() {
    const { value, func } = this.props;
    if (value && func) {      
      this.sendComment = func.sendComment;
    }
    return (
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "95vh" }}
      >
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={this.state.messageList}
        />
        <div style={{ width: "100%", marginTop: "auto" }}>
          <TextField
            label="comment"
            multiline
            margin="normal"
            variant="outlined"
            rows="3"
            onChange={e => (this.text = e.target.value)}
            style={{ width: "100%" }}
          />
          <br />
          <div style={{ float: "right" }}>
            {setBtnPicFile(file => {
              this.selectFile = file;
            })}
            <Button
              onClick={() => {
                this.sendComment({ text: this.text, file: this.selectFile });
              }}
            >
              comment
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default function setFormDmChat(
  value = {},
  func = { sendComment: () => {} }
) {
  return <FormDmChat value={value} func={func} />;
}
