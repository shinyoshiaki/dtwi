import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { TextField, Button, Modal, IconButton } from "@material-ui/core";
import setBtnPicFile from "../main/header/btnPicFile";
import setVideoChat from "../common/videoChat";
import { Close } from "@material-ui/icons";
import WebRTC from "webrtc4me";

export class FormDmChat extends Component {
  state = { text: "", videoModal: false };

  toAccount = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/account");
  };

  state = {
    messageList: []
  };

  sendComment = () => {};
  selectFile;
  selectFilename;
  dataSource;
  peer = {};

  openVideoModal = () => {
    this.setState({ videoModal: true });
    const send = (peer = new WebRTC()) => {
      peer.send("openVideo", "chat_video");
    };
    send(this.peer);
  };

  render() {
    const { value, func } = this.props;
    if (value && func) {
      this.sendComment = func.sendComment;
      this.peer = value.chat_peer;
      const listenPeer = (peer = new WebRTC()) => {
        peer.events.data["chat.js"] = raw => {
          if (raw.label === "chat_video" && raw.data === "openVideo") {
            this.setState({ videoModal: true });
          }
        };
      };
      listenPeer(this.peer);

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
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
            style={{ width: "100%" }}
          />
          <br />
          <Button onClick={this.openVideoModal}>video </Button>
          <div style={{ float: "right", display: "flex" }}>
            {setBtnPicFile(
              { btnpicfile_label: "file" },
              {
                btnpicfile_set: (file, filename) => {
                  console.log("chat pic", filename);
                  this.selectFile = file;
                  this.selectFilename = filename;
                }
              }
            )}
            <Button
              onClick={() => {
                this.sendComment({
                  text: this.state.text,
                  file: this.selectFile,
                  filename: this.selectFilename
                });
                this.setState({ text: "" });
              }}
            >
              comment
            </Button>
          </div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.videoModal}
            onClose={() => {
              this.setState({ videoModal: false });
            }}
            style={{ display: "flex" }}
          >
            <div
              style={{
                width: "70%",
                height: "70%",
                flex: "0 1 auto",
                margin: "auto",
                background: "white"
              }}
            >
              <IconButton
                onClick={() => {
                  this.setState({ videoModal: false });
                }}
                style={{ float: "right" }}
              >
                <Close />
              </IconButton>
              {setVideoChat({ videochat_peer: this.peer }, {})}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default function setFormDmChat(
  value = { messages: {}, nodeId: "", chat_peer: {} },
  func = { sendComment: () => {} }
) {
  return <FormDmChat value={value} func={func} />;
}
