import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Consumer } from "../main/index";
import { getSliceArrayBuffer } from "../../lib/file";

export default class BtnPicFile extends Component {
  handleFile = async (e, setFile) => {
    const blob = e.target.files[0];
    const result = await getSliceArrayBuffer(blob).catch(console.log);
    if (!result) return;
    setFile(result);
  };

  render() {
    return (
      <Consumer>
        {context => {
          context = context || {};
          return (
            <div>
              <input
                type="file"
                id="raised-button-file"
                style={{ display: "none" }}
                onChange={e => this.handleFile(e, context.setFile)}
              />
              <label htmlFor="raised-button-file">
                <Button>picture</Button>
              </label>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
