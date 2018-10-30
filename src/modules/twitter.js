import Kademlia from "kad-rtc";
import { iTweet } from "../interface/iTwitter";
import sha1 from "sha1";

export const initialState = {
  myTweets: [],
  lastTweet: undefined,
  timeline: [],
  userTweets: {},
  followIds: []
};

export const Istate = {
  myTweets: "myTweets",
  timeline: "timeline",
  lastTweet: "lastTweet"
};

export const actionType = {
  SET_VALUE: "TWITTER_SET_VALUE",
  PUSH_ARR: "TWITTER_PUSH_ARR",
  RESET_USER_TWEET: "TWITTER_RESET_USER_TWEET",
  ADD_USER_TWEET: "TWITTER_ADD_USER_TWEET",
  FOLLOW: "TWITTER_FOLLOW"
};

export function event(kad = new Kademlia(), dispatch) {
  console.log({ kad });
  kad.events.store["twitter.js"] = value => {
    console.log("twitter event", { value });
    if (value.type === "tweet") {
      console.log("on tweet");
      getTimeline(kad, dispatch);
    }
  };
}

export async function findTweet(key, kad = new Kademlia(), dispatch) {
  dispatch({ type: actionType.RESET_USER_TWEET, data: key });
  for (;;) {
    const result = await kad.findValue(key).catch(console.log);
    if (!result) break;
    if (result.type === "tweet") {
      console.log("find tweet");
      getTimeline(kad, dispatch);
      key = result.hash;
    } else {
      break;
    }
  }
}

function getTimeline(kad = new Kademlia(), dispatch) {
  const kvs = kad.keyValueList;
  const timeline = [];
  Object.keys(kvs).forEach(key => {
    const value = kvs[key];
    if (value.type === "tweet") {
      timeline.push(value);
    }
  });
  const sort = timeline
    .sort((a, b) => {
      return a.time - b.time;
    })
    .reverse();
  setValue(Istate.timeline, sort, dispatch);
}

export function tweet(
  value,
  kad = new Kademlia(),
  dispatch,
  state = initialState,
  opt = { picture: undefined }
) {
  const tweet = iTweet(kad.nodeId, Date.now(), value, { pic: opt.picture });
  if (state.lastTweet) {
    kad.store(kad.nodeId, state.lastTweet.hash, tweet);
  } else {
    kad.store(kad.nodeId, kad.nodeId, tweet);
  }
  setValue(Istate.lastTweet, tweet, dispatch);
  dispatch({
    type: actionType.PUSH_ARR,
    data: { key: Istate.myTweets, value: tweet }
  });
}

export function follow(id, dispatch) {
  dispatch({ type: actionType.FOLLOW, data: id });
}

export function setValue(key, value, dispatch) {
  dispatch({ type: actionType.SET_VALUE, data: { key, value } });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_VALUE:
      return { ...state, [action.data.key]: action.data.value };
    case actionType.PUSH_ARR:
      return {
        ...state,
        [action.data.key]: state[action.data.key].concat(action.data.value)
      };
    case actionType.RESET_USER_TWEET:
      state.userTweets[action.data] = [];
      return { ...state, userTweets: state.userTweets };
    case actionType.ADD_USER_TWEET:
      console.log("twitterjs reducer", { state });
      state.userTweets[action.data.id].push(action.data);
      return {
        ...state,
        userTweets: state.userTweets
      };
    case actionType.FOLLOW:
      if (!state.followIds.includes(action.data))
        state.followIds.push(action.data);
      return { ...state, followIds: state.followIds };
    default:
      return state;
  }
}
