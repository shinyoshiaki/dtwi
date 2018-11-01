import React from "react";
import { connect } from "react-redux";
import { setValue, Istate } from "../modules/p2p";
import Node from "kad-rtc/lib/node/node";
import { event } from "../modules/twitter";
import { event as dmEvent } from "../modules/dm";
import setSignin from "../components/login";

class Login extends React.Component {
  targetAddress = "35.196.94.146";
  targetPort = 20000;

  connectNode = (pubkey, seckey) => {
    const { dispatch } = this.props;
    const targetUrl = `http://${this.targetAddress}:${this.targetPort}`;
    console.log(this.targetAddress, { targetUrl });

    setValue(Istate.targetUrl, targetUrl, dispatch);
    const node = new Node(this.targetAddress, this.targetPort, {
      pubkey,
      seckey
    });
    setValue(Istate.node, node, dispatch);
    setValue(Istate.kad, node.kad, dispatch);

    event(node.kad, dispatch);
    dmEvent(node.kad, dispatch);

    this.props.history.push("/main");
  };

  render() {
    return <div>{setSignin(this.connectNode, this.connectNode)}</div>;
  }
}

export default connect()(Login);
