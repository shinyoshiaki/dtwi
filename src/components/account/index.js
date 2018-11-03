import React, { Component, createContext } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Istate } from "../../modules/twitter";
import { setTimeline } from "../../components/common/timelline";
import { setFollowList } from "./followList";

const Context = createContext();
export const { Provider, Consumer } = Context;

export class AccountContext extends Component {
  twitter = [];
  toMain = () => {};
  p2p = { kad: { nodeId: "null", cypher: { secKey: "null", pubKey: "null" } } };

  render() {
    const { value, func } = this.props;
    if (value && func) {
      this.twitter = value.twitter;
      this.toMain = func.toMain;
      this.p2p = value.p2p;
    }
    console.log("account context", this.p2p);
    return (
      <div>
        <IconButton onClick={this.toMain} style={{ marginLeft: "auto" }}>
          <ArrowBack />
        </IconButton>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <div
              style={{
                border: "1px solid",
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: "#d6d7da"
              }}
            >
              nodeId
              <br />
              {this.p2p.kad.nodeId}
              <br />
            </div>
            {setFollowList(value, func)}
          </div>
          <div
            style={{
              flex: 1,
              border: "1px solid",
              borderRadius: 4,
              borderWidth: 0.5,
              borderColor: "#d6d7da"
            }}
          >
            <div>my post</div>
            {setTimeline(this.twitter[Istate.myTweets], value.p2p)}
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default function setAccountContext(
  value = {
    twitter: [],
    follows: [],
    p2p: {
      kad: {
        nodeId: "null",
        cypher: {
          secKey:
            "-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEAsS+dizngIjgt5wKPD4IAXKd/FgcCR1ygx15WcuYw1krRC/va1+exphbA WUUthHTraT1Qt1ptKEaEHGAzYQgmVvM2JmNTIF53ndAtIuDPHIRTD4bnPPi75ynxynqTEtw5 +42cgkVRuPZ28spqxDG6G8zjQwYyNS58ODmCKnXT3BMu7SDv4gJYsPPR0hXc6c2ABy+vVvYM DbIOJ06e2Z3+I1I6wDlOLjRW2DoaEQ4phwxYbWCaWjIajUhoE+nHCGeM8ybyWWNGqJ7sTai+ XRUcyWdRvHPSuIpXUlB/aWI6WYC1OczDT4L2NZS1NmuuxBOcZn9JbGnZQXdom8bjaNz1wQID AQABAoIBAEgINoEKV08yDZ8zkBta23DPez/mO4vtYUOL25M8d7A2nEPF8NMDU1pVN39TO0z1 B1syXSUdMvFDsaOjjF+vI38HwwTaLkojfXd/0UmzoR9TwDy4uDs2V5WDnNOW/0GUnFHi4TSo n6+VKwhLOBpoqONyaRWvaCvsqP1mi79dRXLbACwiwwAGP5DuhQIMZOtuQDfa3d/shdhvbGhe zn5bo5rjPeijtc+OZfxt1BHCuSL6fIc2NYU61tv77uK9IpPcpfQHWkArncRxPVlsn8jRgg7E tJtbw8FETxchdIbeduuVehAb2wVd2DMa40TQbXsfyVaAqBfc4J6mrX9v1/89es0CgYEA4bOR rwNBC4gU9TnX84AqoFmBAut/97MEWAcvuwV3U23mCAZlbpHq12vBusfGLgcBhKbx1tpq+DKf 7ZU5n+bmWicY2gde2RdjLKJjVxKDupj09rEXXTYEPY5pu0aCqp779QulMGL15LrJSYw7aAWg Ms6GxnFmR7MXrL0w3Q6zNH8CgYEAyPjFGSj/bx/CxswOiE0KI9SpzfmJ6enrfuq243i79uiq mQ7PIdR04AKiUXkfwKQlKMtV5j1GFz+VUgH4HiCyBWjVn3z1hpjS9cmYi0fToD0Ltrf+d6IO 85OkZMwbvd5HFilQCzYHXDSmyg1e51heBPrfEngi74+XZQbI6sF1tb8CgYBeo0T69YpYo37m NJLwb1VwVxdZehX2bwHrR1gkO26FdRd3VfdCHb0zBuP8xbe7pQRl8vqE9KDV4aRdoqy+97qv IqWxBlYnAT98f7rXz9OccnaE2kzJsNSmWwjKlg5ELNXJMlDZsSUZ+5hbVomyXGmH5EFvBC22 8smCjPHoPzm1UQKBgQCoWAI6BiaZfgBZJ/sQX4Ab7Xrjp6DHyQNUB+Z0+uBwfgrRNR96lg3k yzAOkShw5M6fslvdBfydYsyAqledXQPiFiPDehfszD0CWAEowlzZ/+i9ALjum1hs3oK5UGP4 kqX3QVnkWjimGxCPdc3GejYfc8nCHdId26kUni9UvgMM3wKBgEmCvlBXcYycUmyt9OQSYaJh LNS65YrHnG5JXqO0tdJcnBJFiqAzOH/VYiKep6vmbP2RpBbMYA0vb/+3Y17QajfGAD7IlzZr zRUsJ8CjaX/5/VeCtjKC5igQdMOkkxJnwOZvKma32EIoA3VPo8p4XqLZsQTtxT+XWeAXElzW nrUc -----END RSA PRIVATE KEY----- ",
          pubKey:
            "-----BEGIN RSA PUBLIC KEY----- MIIBCgKCAQEAsS+dizngIjgt5wKPD4IAXKd/FgcCR1ygx15WcuYw1krRC/va1+exphbAWUUt hHTraT1Qt1ptKEaEHGAzYQgmVvM2JmNTIF53ndAtIuDPHIRTD4bnPPi75ynxynqTEtw5+42c gkVRuPZ28spqxDG6G8zjQwYyNS58ODmCKnXT3BMu7SDv4gJYsPPR0hXc6c2ABy+vVvYMDbIO J06e2Z3+I1I6wDlOLjRW2DoaEQ4phwxYbWCaWjIajUhoE+nHCGeM8ybyWWNGqJ7sTai+XRUc yWdRvHPSuIpXUlB/aWI6WYC1OczDT4L2NZS1NmuuxBOcZn9JbGnZQXdom8bjaNz1wQIDAQAB -----END RSA PUBLIC KEY-----"
        }
      }
    }
  },
  func = { toMain: () => {}, onClickId: () => {} }
) {
  return <AccountContext value={value} func={func} />;
}
