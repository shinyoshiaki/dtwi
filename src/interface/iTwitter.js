import sha1 from "sha1";

export function iTweet(id, time, msg, opt = { pic: undefined }) {
  const tweet = {
    type: "tweet",
    id,
    time,
    msg,
    hash: undefined,
    pic: undefined
  };
  tweet.hash = sha1(JSON.stringify(tweet)).toString();
  tweet.pic = opt.pic;
  return tweet;
}
