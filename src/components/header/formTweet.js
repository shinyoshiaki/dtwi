import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Consumer } from "../main";
import setBtnPicFile from "./btnPicFile";

export class FormTweet extends Component {
  state = { target: "" };
  file;

  handlePicFile = file => {
    this.file = file;
  };

  render() {
    const { closeModal } = this.props;
    return (
      <Consumer>
        {context => {
          context = context || { func: { excuteTweet: () => {} }, val: {} };
          return (
            <div style={{ margin: 10 }}>
              <TextField
                label="tweet"
                multiline
                margin="normal"
                variant="outlined"
                rows="6"
                style={{ width: "100%" }}
                value={this.state.target}
                onChange={e => {
                  this.setState({ target: e.target.value });
                }}
              />
              <br />
              <div style={{ bottom: 0 }}>
                <div style={{ float: "left" }}>
                  {setBtnPicFile(this.handlePicFile)}
                </div>
                <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    context.func.excuteTweet(this.state.target, this.file);
                    this.setState({ target: "" });
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
