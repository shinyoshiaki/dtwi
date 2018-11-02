import React from "react";
import { storiesOf } from "@storybook/react";
import { header } from "../components/main/header";
import setTweet from "../components/common/timelline/tweet";
import { setTimeline } from "../components/common/timelline";
import setBtnOpenTweet from "../components/main/header/btnOpenTweet";
import { FormTweet } from "../components/main/header/formTweet";
import BtnPicFile from "../components/main/header/btnPicFile";
import FormBadge from "../components/user/badge";
import setUserContext from "../components/user";
import setSignin from "../components/login";
import ChatTest from "../components/dm/test";
import { FormDmChat } from "../components/dm/chat";
import { setFollowList } from "../components/account/followList";
import setFormSearchUser from "../components/main/header/formSearchUser";

storiesOf("Header", module)
  .add("index", () => header([1, 2, 3], [1, 2, 3]))
  .add("btnOpenTweet", () => setBtnOpenTweet(<FormTweet />))
  .add("formTweet", () => <FormTweet />)
  .add("btnPicFile", () => <BtnPicFile />)
  .add("searchUser", () => setFormSearchUser());

storiesOf("Timeline", module)
  .add("timeline center", () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {setTimeline([
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
      ])}
    </div>
  ))
  .add("timeline right", () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%"
      }}
    >
      <div style={{ width: "100%" }}>
        {setTimeline([
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
        ])}
      </div>
    </div>
  ))
  .add("tweet", () => setTweet("test", "1000", "helloworld"));

storiesOf("user", module)
  .add("badge", () => <FormBadge />)
  .add("index", () => {
    return setUserContext([
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
    ]);
  });

storiesOf("login", module).add("index", () => {
  return setSignin((pub, sec) => {
    console.log({ pub }, { sec });
  });
});

storiesOf("dm", module)
  .add("chattest", () => <ChatTest />)
  .add("chat", () => <FormDmChat />);

storiesOf("account", module).add("followlist", () => {
  return setFollowList({ follows: ["a", "b", "c"] });
});
