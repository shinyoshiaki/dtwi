import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import setBtnPicFile from "./btnPicFile";

export class FormTweet extends Component {
  text;
  file;

  handlePicFile = file => {
    this.file = file;
  };

  render() {
    const { excuteTweet, closeModal } = this.props;
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
          <div style={{ float: "left" }}>{setBtnPicFile(this.btnPicFile)}</div>
          <Button
            style={{ float: "right" }}
            onClick={() => {
              excuteTweet(this.text, this.file);
              closeModal();
            }}
          >
            tweet
          </Button>
        </div>
      </div>
    );
  }
}

export default function setFormTweet(excuteTweet, closeModal) {
  return <FormTweet excuteTweet={excuteTweet} closeModal={closeModal} />;
}
