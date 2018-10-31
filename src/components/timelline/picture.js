import React, { Component } from "react";
import { Consumer } from "../main";

export class ImageTweet extends Component {
  context;
  imageUrl;
  constructor(props) {
    super(props);
    this.state = {
      imgsrc: undefined
    };
    const { imageUrl } = this.props;
    this.imageUrl = imageUrl;
  }

  componentDidMount() {
    const { imageUrl } = this.props;
    console.log("picture didmount", { imageUrl });
    (async () => {
      if (imageUrl) {
        const result = await this.context
          .findPicture(imageUrl)
          .catch(console.log);
        if (result) {
          this.setState({ imgsrc: result });
        }
      }
    })();
  }

  componentDidUpdate() {
    //imageUrlがよくわからない動きをするのでライフサイクルを追加
    const { imageUrl } = this.props;
    console.log("picture didupdate", { imageUrl });
    (async () => {
      if (imageUrl !== this.imageUrl) {
        this.imageUrl = imageUrl;
        console.log("componentDidUpdate find");
        const result = await this.context
          .findPicture(imageUrl)
          .catch(console.log);
        if (result) {
          this.setState({ imgsrc: result });
        }
      }
    })();
  }

  render() {
    const { imageUrl } = this.props;
    return (
      <Consumer>
        {context => {
          context = context || {};
          this.context = context;
          return (
            <div>
              {imageUrl}
              <img src={this.state.imgsrc} alt={imageUrl} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default function setImageTweet(imageUrl) {
  console.log("setpicture", { imageUrl });
  return <ImageTweet imageUrl={imageUrl} id={imageUrl} />;
}
