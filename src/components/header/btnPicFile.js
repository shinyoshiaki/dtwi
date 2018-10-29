import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class BtnPicFile extends Component {
  handleFile = e => {
    const { set } = this.props;
    set(e.target.files[0]);
  };
  render() {
    return (
      <div>
        <input
          type="file"
          id="raised-button-file"
          style={{ display: "none" }}
          onChange={this.handleFile}
        />
        <label htmlFor="raised-button-file">
          <Button raised component="span">
            picture
          </Button>
        </label>
      </div>
    );
  }
}

export default function setBtnPicFile(set) {
  return <BtnPicFile set={set} />;
}
