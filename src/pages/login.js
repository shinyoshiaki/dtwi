import React from "react";
import { connect } from "react-redux";
import { setValue, Istate } from "../modules/p2p";
import Node from "kad-rtc/lib/node/node";
import {
  event,
  tweet,
  setValue as setTwitterValue,
  Istate as Itwitter
} from "../modules/twitter";
import { event as dmEvent } from "../modules/dm";
import setSignin from "../components/login";
import { getStream } from "../lib/video";
import { encrypt, decrypt } from "../lib/cypher";
import { setConditionValue, Icondition } from "../modules/condition";

class Login extends React.Component {
  targetAddress = "35.196.94.146";
  targetPort = 20000;
  state = { videoSrc: undefined, localSrc: undefined };

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

    console.log(node.kad.cypher.pubKey);
    let templink = document.createElement("a");
    templink.href = window.URL.createObjectURL(
      new Blob([node.kad.cypher.pubKey], {
        type: "text/plain"
      })
    );
    templink.download = "pubkey.txt";
    templink.style.display = "none";
    document.body.appendChild(templink);
    templink.click();
    document.body.removeChild(templink);

    templink = document.createElement("a");
    templink.href = window.URL.createObjectURL(
      new Blob([node.kad.cypher.secKey], {
        type: "text/plain"
      })
    );
    templink.download = "seckey.txt";
    templink.style.display = "none";
    document.body.appendChild(templink);
    templink.click();
    document.body.removeChild(templink);

    event(node.kad, dispatch);
    dmEvent(node.kad, dispatch);

    return node;
  };

  toMain = () => {
    this.props.history.push("/main");
  };

  register = nickname => {
    const { dispatch } = this.props;
    setTwitterValue(Itwitter.nickname, nickname, dispatch);
    this.connectNode();
    this.toMain();
  };

  login = (pubkey, seckey) => {
    try {
      const word = "test";
      const enc = encrypt(word, seckey);
      const dec = decrypt(enc, pubkey);
      if (word === dec) {
        this.connectNode(pubkey, seckey);
      } else {
        console.log("error");
      }
      this.toMain();
    } catch (error) {
      console.log({ error });
    }
  };

  render() {
    return <div>{setSignin(this.login, this.register)}</div>;
  }
}

const mapStateToProps = state => {
  return {
    twitter: state.twitter
  };
};

export default connect(mapStateToProps)(Login);
