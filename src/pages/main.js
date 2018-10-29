import React from "react";
import { connect } from "react-redux";
import { header } from "../components/header";
import { Typography } from "@material-ui/core";
import { tweet } from "../modules/twitter";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Main extends React.Component {
  state = {
    value: 0
  };

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
            <TabContainer>Item One</TabContainer>,
            <TabContainer>Item Two</TabContainer>,
            <TabContainer>Item Three</TabContainer>
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
