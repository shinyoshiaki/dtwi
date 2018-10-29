import React, { Component } from "react";
import { connect } from "react-redux";
import { IconButton, TextField, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { withRouter } from "react-router";
import setBtnPicFile from "./btnPicFile";

export class FormTweet extends Component {
  toAccout = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/accout");
  };
  render() {
    const { btnPicFile } = this.props;
    return (
      <div style={{ margin: 10 }}>
        <TextField
          label="tweet"
          multiline
          margin="normal"
          variant="outlined"
          rows="6"
          style={{ width: "100%" }}
        />
        <br />
        <div style={{ bottom: 0 }}>
          <div style={{ float: "left" }}>{setBtnPicFile(btnPicFile)}</div>
          <Button style={{ float: "right" }}>tweet</Button>
        </div>
      </div>
    );
  }
}

// export default withRouter(BtnAccout);
