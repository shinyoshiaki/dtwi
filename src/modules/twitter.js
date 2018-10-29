import Kademlia from "kad-rtc";
import sha1 from "sha1";

export const initialState = {
  myTweets: {}
};

export const Istate = {
  myTweets: "myTweets"
};

export const actionType = {
  SET_VALUE: "SET_VALUE",
  TWEET: "TWEET"
};

export function tweet(
  value,
  kad = new Kademlia(),
  dispatch,
  opt = { picture: undefined }
) {
  const tweet = {
    sender: kad.nodeId,
    msg: value,
    seed: Math.random()
  };
  if (opt.picture) tweet.pic = opt.picture;
  const hash = sha1(JSON.stringify(tweet)).toString();

  kad.store(kad.nodeId, hash, tweet);
  dispatch({ type: actionType.TWEET, data: { tweet, hash } });
}

export function setValue(key, value, dispatch) {
  dispatch({ type: actionType.SET_VALUE, data: { key, value } });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_VALUE:
      state[action.data.key] = action.data.value;
      return state;
    case actionType.TWEET:
      return {
        ...state,
        myTweets: (state.myTweets[action.data.hash] = action.data.tweet)
      };
    default:
      return state;
  }
}
