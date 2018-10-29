import React from "react";
import { connect } from "react-redux";
import { Button, TextField, Typography } from "@material-ui/core";
import { setValue, Istate } from "../modules/p2p";
import Node from "kad-rtc/lib/node/node";
import { event } from "../modules/twitter";

class Login extends React.Component {
  targetAddress = "35.196.94.146";
  targetPort = 20000;
  connectNode = () => {
    const { dispatch } = this.props;
    const targetUrl = `http://${this.targetAddress}:${this.targetPort}`;
    console.log(this.targetAddress, { targetUrl });

    setValue(Istate.targetUrl, targetUrl, dispatch);
    const node = new Node(this.targetAddress, this.targetPort);
    setValue(Istate.node, node, dispatch);
    setValue(Istate.kad, node.kad, dispatch);

    event(node.kad, dispatch);

    this.props.history.push("/main");
  };

  render() {
    return (
      <div>
        <Typography>{"login"}</Typography>
        <TextField
          label="target address"
          onChange={e => (this.targetAddress = e.target.value)}
        />
        <br />
        <TextField
          label="target port"
          onChange={e => (this.targetPort = e.target.value)}
        />
        <br />
        <Button onClick={this.connectNode}>connect</Button>
        <br />
      </div>
    );
  }
}

export default connect()(Login);
