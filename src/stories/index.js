import React from "react";
import { storiesOf } from "@storybook/react";
import { header } from "../components/header";
import setTweet from "../components/timelline/tweet";
import { setTimeline } from "../components/timelline";
import setBtnOpenTweet from "../components/header/btnOpenTweet";
import { FormTweet } from "../components/header/formTweet";
import { BtnPicFile } from "../components/header/btnPicFile";

storiesOf("Header", module)
  .add("index", () => header([1, 2, 3], [1, 2, 3]))
  .add("btnOpenTweet", () => setBtnOpenTweet(<FormTweet />))
  .add("formTweet", () => <FormTweet />)
  .add("btnPicFile", () => <BtnPicFile />);

storiesOf("Timeline", module)
  .add("timeline", () =>
    setTimeline([
      {
        id: "1",
        time: "0000",
        msg: "hello"
      },
      {
        id: "2",
        time: "0000",
        msg: "hellow"
      }
    ])
  )
  .add("tweet", () => setTweet("test", "1000", "helloworld"));
