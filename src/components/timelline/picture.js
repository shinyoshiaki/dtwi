import React, { Component } from "react";
import { Consumer } from ".";
import Kademlia from "kad-rtc";

const findPicture = (url, p2p) => {
  if (!p2p.kad) return;
  console.log("findpicture", { url });
  return new Promise((resolve, reject) => {
    find(p2p.kad);
    async function find(kad = new Kademlia()) {
      if (Object.keys(kad.keyValueList).includes(url)) {
        console.log("fownd picture", kad.keyValueList[url]);
        try {
          resolve(
            window.URL.createObjectURL(new Blob(kad.keyValueList[url].chunks))
          );
        } catch (error) {
          reject("findpicture blob error", { error });
        }
      } else {
        console.log("findpicture findvalue");
        const result = await kad.findValue(url).catch(console.log);
        if (!result) reject("file not fownd");
        try {
          console.log("findpicture findvalue", { result });

          resolve(window.URL.createObjectURL(new Blob(result.chunks)));
        } catch (error) {
          reject("findpicture blob error", { error }, { result });
        }
      }
    }
  });
};

export class ImageTweet extends Component {
  p2p;
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
        const result = await findPicture(imageUrl, this.p2p).catch(console.log);
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
        const result = await findPicture(imageUrl, this.p2p).catch(console.log);
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
          this.p2p = context.p2p;
          return (
            <div>
              {imageUrl}
              <img src={this.state.imgsrc} alt={imageUrl} width="70%" />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default function setImageTweet(imageUrl) {
  console.log("setpicture", { imageUrl });
  return <ImageTweet imageUrl={imageUrl} key={imageUrl} />;
}
