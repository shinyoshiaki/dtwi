import React, { Component } from "react";
import WebRTC from "webrtc4me";
import Stream, { getLocalStream } from "webrtc4me/lib/stream";

export class VideoChat extends Component {
  state = { videoSrc: undefined, localSrc: undefined };
  peer = {};
  closeModal = () => {};

  setProps(props) {
    const { val, func } = props;
    if (val && func) {
      this.peer = val.videochat_peer;
      this.closeModal = val.videochat_closeModal;
    }
  }

  componentDidMount() {
    this.setProps(this.props);
    console.log("videochat didmount", this.peer);
    const connectStream = async (peer = new WebRTC()) => {
      const local = await getLocalStream();
      console.log("videochat didmout", { peer });
      const stream = new Stream(peer, local);
      stream.stream = media => {
        console.log("videochat", { media });
        this.video.srcObject = media;
      };
    };
    connectStream(this.peer);
  }

  render() {
    console.log("media", this.state.videoSrc, this.state.localSrc);
    return (
      <div
        style={{
          flex: "0 1 auto",
          margin: "auto"
        }}
      >
        <video
          ref={video => {
            this.video = video;
          }}
          autoPlay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default function setVideoChat(
  val = { videochat_peer: {} },
  func = { videochat_closeModal: () => {} }
) {
  console.log("setvideochat", { val }, { func });
  return <VideoChat val={val} func={func} />;
}
