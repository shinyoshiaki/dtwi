import Kademlia from "kad-rtc";
import { iTweet } from "../interface/iTwitter";

export const initialState = {
  myTweets: [],
  tweets: []
};

export const Istate = {
  myTweets: "myTweets",
  tweets: "tweets"
};

export const actionType = {
  SET_VALUE: "SET_VALUE",
  PUSH_ARR: "PUSH_ARR"
};

export function event(kad = new Kademlia(), dispatch) {
  console.log({ kad });
  kad.events.store["twitter.js"] = value => {
    console.log("twitter event", { value });
    if (value.type === "tweet") {
      console.log("on tweet");
      dispatch({
        type: actionType.PUSH_ARR,
        data: { key: Istate.tweets, value }
      });
    }
  };
}

export function tweet(
  value,
  kad = new Kademlia(),
  dispatch,
  opt = { picture: undefined }
) {
  const tweet = iTweet(kad.nodeId, Date.now(), value, { pic: opt.picture });

  kad.store(kad.nodeId, tweet.hash, tweet);
  dispatch({
    type: actionType.PUSH_ARR,
    data: { key: Istate.myTweets, value: tweet }
  });
}

export function setValue(key, value, dispatch) {
  dispatch({ type: actionType.SET_VALUE, data: { key, value } });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_VALUE:
      state[action.data.key] = action.data.value;
      return state;
    case actionType.PUSH_ARR:
      return {
        ...state,
        [action.data.key]: state[action.data.key].concat(action.data.value)
      };

    default:
      return state;
  }
}
