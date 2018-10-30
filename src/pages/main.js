import React from "react";
import { connect } from "react-redux";
import { tweet } from "../modules/twitter";
import setMainContext from "../components/main";
import { setValue, Istate } from "../modules/condition";

class Main extends React.Component {
  constructor(props) {
    super(props);
    const { p2p, history } = this.props;
    this.state = {
      value: 0,
      kbuckets: []
    };

    if (!p2p.kad) {
      history.push("/");
    }
  }

  componentDidMount() {
    const { p2p } = this.props;
    this.listenAddPeer(p2p.kad);
  }

  listenAddPeer(kad) {
    if (!kad) return;
    console.log("addlister");
    kad.callback.onAddPeer = data => {
      console.log("onaddpeer", { data });
      this.setState({ kbuckets: kad.kbuckets });
    };
  }

  excuteTweet = (text, file) => {
    const { dispatch, p2p, twitter } = this.props;
    tweet(text, p2p.kad, dispatch, twitter, { picture: file });
  };

  setFile = chunks => {
    const { dispatch } = this.props;
    setValue(Istate.selectFile, chunks, dispatch);
  };

  render() {
    return (
      <div>
        {setMainContext(
          this.excuteTweet,
          this.state.kbuckets,
          {},
          this.setFile
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p2p: state.p2p,
    twitter: state.twitter
  };
};

export default connect(mapStateToProps)(Main);
