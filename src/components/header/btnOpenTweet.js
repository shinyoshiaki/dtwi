import React, { Component } from "react";
import { Button, Modal, Typography, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import setFormTweet from "./formTweet";

export class BtnOpenTweet extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { excuteTweet } = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen}>tweet</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          style={{ display: "flex" }}
        >
          <div
            style={{
              width: "60%",
              height: 280,
              flex: "0 1 auto",
              margin: "auto",
              background: "white"
            }}
          >
            <div>
              <IconButton onClick={this.handleClose} style={{ float: "right" }}>
                <Close />
              </IconButton>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                ツイートする
              </Typography>
            </div>
            <br />
            {setFormTweet(excuteTweet, this.handleClose)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default function setBtnOpenTweet(excuteTweet) {
  return <BtnOpenTweet excuteTweet={excuteTweet} />;
}
