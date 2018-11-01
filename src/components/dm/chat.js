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
  selectFilename;
  dataSource;

  render() {
    const { value, func } = this.props;
    if (value && func) {
      this.sendComment = func.sendComment;
      const messageArr = value.messages[value.nodeId];
      if (messageArr)
        this.dataSource = messageArr.map(message => {
          console.log({ messagefile: new Blob(message.file) });
          const position = message.type === "me" ? "right" : "left";
          if (message.text) {
            const text = message.text;
            return {
              position,
              type: "text",
              text,
              date: new Date()
            };
          } else {
            const text = "file";
            const data = {
              uri: window.URL.createObjectURL(new Blob(message.file)),
              blob: new Blob(message.file),
              status: {
                click: true,
                loading: 1
              },
              size: `${new Blob(message.file).size / 1000}kb`,
              width: 300,
              height: 300
            };
            return {
              position,
              type: "file",
              filename: message.filename,
              status: "send",
              text,
              data,
              onDownload: () => {
                console.log("ondownload");
              },
              date: new Date()
            };
          }
        });
    }
    return (
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "95vh" }}
      >
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={this.dataSource}
          onClick={object => {
            console.log({ object });
            if (object.type === "file") {
              //window.open(object.data.uri);
              const templink = document.createElement("a");
              templink.href = object.data.uri;
              templink.download = object.filename;
              templink.style.display = "none";
              document.body.appendChild(templink);
              templink.click();
              document.body.removeChild(templink);
            }
          }}
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
            {setBtnPicFile((file, filename) => {
              console.log("chat pic", filename);
              this.selectFile = file;
              this.selectFilename = filename;
            })}
            <Button
              onClick={() => {
                this.sendComment({
                  text: this.text,
                  file: this.selectFile,
                  filename: this.selectFilename
                });
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
  value = { messages: {}, nodeId: "" },
  func = { sendComment: () => {} }
) {
  return <FormDmChat value={value} func={func} />;
}
