import React, { Component } from "react";
import Stream, { getLocalStream } from "webrtc4me/lib/stream";
import { getStream } from "../../../lib/video";

export default class VideoChatTest extends Component {
  state = { videoSrc: undefined, localSrc: undefined };

  constructor(props) {
    super(props);
    this.connectStream();
  }

  connectStream = async () => {
    const local = await getStream().catch(console.log());
    console.log({ local });
    this.setState({ localSrc: local });
  };

  render() {
    return (
      <div>
        video
        <video src={this.state.localSrc} autoPlay={true} />
      </div>
    );
  }
}
