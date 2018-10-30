import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { getSliceArrayBuffer } from "../../lib/file";

export class BtnPicFile extends Component {
  handleFile = async e => {
    const { set } = this.props;

    const blob = e.target.files[0];
    const result = await getSliceArrayBuffer(blob).catch(console.log);
    if (!result) return;
    console.log("btn pic file", { result });
    set(result);
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
