import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { getSliceArrayBuffer } from "../../../lib/file";

export class BtnPicFile extends Component {
  label = "";
  set = () => {};
  handleFile = async e => {
    const blob = e.target.files[0];
    if (!blob) return;
    const result = await getSliceArrayBuffer(blob).catch(console.log);
    if (!result) return;
    console.log("btn pic file", { result });
    this.set(result, blob.name);
  };

  render() {
    const { val, func } = this.props;
    if (val && func) {
      this.label = val.btnpicfile_label;
      this.set = func.btnpicfile_set;
    }
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
            {this.label}
          </Button>
        </label>
      </div>
    );
  }
}

export default function setBtnPicFile(
  val = { btnpicfile_label: "picture" },
  func = { btnpicfile_set: () => {} }
) {
  return <BtnPicFile val={val} func={func} />;
}
