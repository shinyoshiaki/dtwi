import React from "react";
import { connect } from "react-redux";
import { header } from "../components/header";
import { Typography } from "@material-ui/core";
import { tweet } from "../modules/twitter";
import MainTimeLine from "../containers/main/timeline";
import Kademlia from "kad-rtc";
import { createNodeList } from "../components/util/nodeList";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    const { p2p, history } = this.props;
    this.listenAddPeer(p2p.kad);
    this.state = {
      value: 0,
      kbuckets: []
    };

    if (!p2p.kad) {
      history.push("/");
    }
  }

  listenAddPeer(kad) {
    if (!kad) return;
    console.log("addlister");
    kad.callback.onAddPeer = data => {
      console.log("onaddpeer", { data });
      this.setState({ kbuckets: kad.kbuckets });
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  excuteTweet = (text, file) => {
    const { dispatch, p2p } = this.props;
    tweet(text, p2p.kad, dispatch, { picture: file });
  };

  render() {
    const { p2p } = this.props;

    console.log({ p2p });
    return (
      <div>
        {header(
          ["one", "two", "three"],
          [
            <MainTimeLine />,
            <TabContainer>Item Two</TabContainer>,
            createNodeList(this.state.kbuckets)
          ],
          this.excuteTweet
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p2p: state.p2p
  };
};

export default connect(mapStateToProps)(Main);
