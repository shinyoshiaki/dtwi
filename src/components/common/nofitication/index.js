import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";

export class Nofitication extends Component {
  nofiticationOpen = false;
  nofiticationMessage = "";
  nofiticationClose = () => {};

  render() {
    const { val, func } = this.props;
    if (val && func) {
      this.nofiticationOpen = val.nofiticationOpen;
      this.nofiticationMessage = val.nofiticationMessage;
      this.nofiticationClose = func.nofiticationClose;
    }
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.nofiticationOpen}
          onClose={this.nofiticationClose}
          message={this.nofiticationMessage}
        />
      </div>
    );
  }
}

export default function setNofitication(
  val = { nofiticationOpen: false, nofiticationMessage: "" },
  func = { nofiticationClose: () => {} }
) {
  return <Nofitication val={val} func={func} />;
}
