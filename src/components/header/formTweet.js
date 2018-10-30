import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import BtnPicFile from "./btnPicFile";
import { Consumer } from "../main";
import setBtnPicFile from "./btnPicFile";

export class FormTweet extends Component {
  text;
  file;

  handlePicFile = file => {
    this.file = file;
  };

  render() {
    const { closeModal } = this.props;
    return (
      <Consumer>
        {context => {
          return (
            <div style={{ margin: 10 }}>
              <TextField
                label="tweet"
                multiline
                margin="normal"
                variant="outlined"
                rows="6"
                style={{ width: "100%" }}
                onChange={e => (this.text = e.target.value)}
              />
              <br />
              <div style={{ bottom: 0 }}>
                <div style={{ float: "left" }}>
                  {setBtnPicFile(this.handlePicFile)}
                </div>
                <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    context.excuteTweet(this.text, this.file);
                    closeModal();
                  }}
                >
                  tweet
                </Button>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default function setFormTweet(closeModal) {
  return <FormTweet closeModal={closeModal} />;
}
