import React, { Component } from "react";
import { Consumer } from "../main";

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

      if (result) {
        console.log("picture set img", { result });
        this.setState({ imgsrc: result });
      }
    }
  }

  render() {
    return (
      <Consumer>
        {context => {
          context = context || {};
          this.context = context;
          console.log("picture render", this.state.imgsrc);
          return <img src={this.state.imgsrc} alt="" />;
        }}
      </Consumer>
    );
  }
}

export default function setImageTweet(imageUrl) {
  return <ImageTweet imageUrl={imageUrl} />;
}
