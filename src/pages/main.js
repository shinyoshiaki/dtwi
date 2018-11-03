import React from "react";
import { connect } from "react-redux";
import { tweet } from "../modules/twitter";
import setMainContext from "../components/main";
import { setConditionValue, Icondition } from "../modules/condition";
import Kademlia from "kad-rtc";
import { Modal, CircularProgress } from "@material-ui/core";
import setNofitication from "../components/common/nofitication";
import { toDm, toUser } from "../domain/route";

class Main extends React.Component {
  nodeId = "";
  constructor(props) {
    super(props);
    const { p2p, history } = this.props;
    this.state = {
      value: 0,
      kbuckets: p2p.kad ? p2p.kad.kbuckets : []
    };

    if (!p2p.kad) {
      history.push("/");
    }
  }

  componentWillMount() {
    const { p2p } = this.props;
    if (p2p.kad) this.nodeId = p2p.kad.nodeId;
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
    setConditionValue(Icondition.selectFile, chunks, dispatch);
  };

  searchUser = userId => {
    const { dispatch, p2p, history } = this.props;
    searchUser(p2p.kad);
    async function searchUser(kad = new Kademlia()) {
      setConditionValue(Icondition.loading, true, dispatch);
      console.log("searchUser", { userId });
      const peer = kad.f.getPeerFromnodeId(userId);
      if (peer) {
        setConditionValue(Icondition.loading, false, dispatch);
        setConditionValue(Icondition.findUser, userId, dispatch);
        history.push("/user");
      } else {
        const result = await kad
          .findNode(userId, kad.f.getCloseEstPeer(userId))
          .catch(console.log);
        setConditionValue(Icondition.loading, false, dispatch);
        if (result) {
          setConditionValue(Icondition.findUser, userId, dispatch);
          history.push("/user");
        }
      }
    }
  };

  toAccount = () => {
    const { history } = this.props;
    console.log("this.props", this.props);
    if (history) history.push("/account");
  };

  nofiticationClose = () => {
    const { dispatch } = this.props;
    setConditionValue(Icondition.nofiticationOpen, false, dispatch);
  };

  toDm = id => {
    toDm(this.props, id);
  };

  toUser = id => {
    toUser(this.props, id);
  };

  render() {
    const { p2p, condition, dm } = this.props;
    console.log("main", { p2p });
    return (
      <div>
        {setMainContext(
          {
            kbuckets: this.state.kbuckets,
            nodeId: this.nodeId,
            dmlist_messages: dm.messages
          },
          {
            excuteTweet: this.excuteTweet,
            reload: {},
            setFile: this.setFile,
            searchUser: this.searchUser,
            toAccount: this.toAccount,
            toDm: this.toDm,
            toUser: this.toUser
          }
        )}
        <Modal
          open={condition.loading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </Modal>
        {setNofitication(
          {
            nofiticationOpen: condition.nofiticationOpen,
            nofiticationMessage: condition.nofiticationMessage
          },
          { nofiticationClose: this.nofiticationClose }
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p2p: state.p2p,
    twitter: state.twitter,
    condition: state.condition,
    dm: state.dm
  };
};

export default connect(mapStateToProps)(Main);
