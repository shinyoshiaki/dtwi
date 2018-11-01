import Kademlia from "kad-rtc";

export const initialState = {
  messages: {}
};

export const actionType = {
  SEND_DM: "SEND_DM",
  RECEIVE_DM: "RECEIVE_DM"
};

export function setValue(key, value, dispatch) {
  dispatch({ type: actionType.SET_VALUE, data: { key, value } });
}

export function event(kad = new Kademlia(), dispatch) {
  kad.events.p2p["dm.js"] = payload => {
    let data;
    if (payload.text) data = { nodeId: payload.nodeId, text: payload.text };
    else data = { nodeId: payload.nodeId, file: payload.file };
    dispatch({ type: actionType.RECEIVE_DM, data });
  };
}

export async function sendComment(
  target,
  text,
  kad = new Kademlia(),
  dispatch,
  opt = { file: undefined }
) {
  let result = await kad.send(target, { text }).catch(console.log);
  if (!result) return;
  dispatch({ type: actionType.SEND_DM, data: { nodeId: target, text: text } });
  if (opt.file) {
    result = await kad.send(target, { file: opt.file }).catch(console.log);
    if (!result) return;
    dispatch({
      type: actionType.SEND_DM,
      data: { nodeId: target, file: opt.file }
    });
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_DM: {
      const data = action.data;
      const me = (state.messages[data.nodeId] = {});
      const value = (me.me = {});
      if (data.text) {
        value.text = data.text;
      } else if (data.file) {
        value.file = data.file;
      }
      return { ...state, messages: state.messages };
    }
    case actionType.RECEIVE_DM: {
      const data = action.data;
      const you = (state.messages[data.nodeId] = {});
      const value = (you.you = {});
      if (data.text) {
        value.text = data.text;
      } else if (data.file) {
        value.file = data.file;
      }
      return { ...state, messages: state.messages };
    }
    default:
      return state;
  }
}
