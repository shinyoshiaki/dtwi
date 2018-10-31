import React, { Component } from "react";
import { Consumer } from "../main";
import { blob2DataUrl } from "../../lib/file";

export class ImageTweet extends Component {
  state = {
    imgsrc: undefined
  };

  async componentDidMount() {
    const { imageUrl } = this.props;
    console.log("picture", this.props, this.context);
    if (imageUrl) {
      const result = await this.context
        .findPicture(imageUrl)
        .catch(console.log);
      const url = await blob2DataUrl(result);
      if (result) {
        console.log("picture set img", { url });
        this.setState({ imgsrc: url });
      }
    }
  }

  render() {
    return (
      <Consumer>
        {context => {
          context = context || {};
          this.context = context;
          return <img src={this.state.imgsrc} alt="" />;
        }}
      </Consumer>
    );
  }
}

export default function setImageTweet(imageUrl) {
  return <ImageTweet imageUrl={imageUrl} />;
}
