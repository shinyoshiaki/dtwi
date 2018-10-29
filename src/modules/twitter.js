import Kademlia from "kad-rtc";
import { iTweet } from "../interface/iTwitter";

export const initialState = {
  myTweets: []
};

export const Istate = {
  myTweets: "myTweets"
};

export const actionType = {
  SET_VALUE: "SET_VALUE",
  TWEET: "TWEET"
};

export function event(kad = new Kademlia()) {
  kad.events.store["twitter.js"] = value => {};
}

export function tweet(
  value,
  kad = new Kademlia(),
  dispatch,
  opt = { picture: undefined }
) {
  const tweet = iTweet(kad.nodeId, Date.now(), value, { pic: opt.picture });

  kad.store(kad.nodeId, tweet.hash, tweet);
  dispatch({ type: actionType.TWEET, data: tweet });
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
        myTweets: state.myTweets.concat(action.data)
      };
    default:
      return state;
  }
}
