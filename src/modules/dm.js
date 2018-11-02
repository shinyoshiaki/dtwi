import Kademlia from "kad-rtc";
import { setConditionValue, Icondition } from "./condition";

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
    else
      data = {
        nodeId: payload.nodeId,
        file: payload.file,
        filename: payload.filename
      };
    dispatch({ type: actionType.RECEIVE_DM, data });
    setConditionValue(Icondition.nofiticationOpen, true, dispatch);
    setConditionValue(
      Icondition.nofiticationMessage,
      `dm comming 「${payload.text}」`,
      dispatch
    );
  };
}

export async function sendComment(
  target,
  text,
  kad = new Kademlia(),
  dispatch,
  opt = { file: undefined, filename: undefined }
) {
  let result = await kad.send(target, { text }).catch(console.log);
  if (!result) return;
  dispatch({ type: actionType.SEND_DM, data: { nodeId: target, text: text } });
  if (opt.file) {
    result = await kad
      .send(target, { file: { name: opt.filename, value: opt.file } })
      .catch(console.log);
    if (!result) return;
    dispatch({
      type: actionType.SEND_DM,
      data: { nodeId: target, file: opt.file, filename: opt.filename }
    });
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_DM: {
      const data = action.data;

      if (!state.messages[data.nodeId]) state.messages[data.nodeId] = [];
      const value = state.messages[data.nodeId];

      if (data.text) {
        value.push({ type: "me", text: data.text });
      } else if (data.file) {
        value.push({ type: "me", file: data.file, filename: data.filename });
      }
      return { ...state, messages: state.messages };
    }
    case actionType.RECEIVE_DM: {
      const data = action.data;

      if (!state.messages[data.nodeId]) state.messages[data.nodeId] = [];
      const value = state.messages[data.nodeId];

      if (data.text) {
        value.push({ type: "you", text: data.text });
      } else if (data.file) {
        value.push({ type: "you", file: data.file, filename: data.filename });
      }
      return { ...state, messages: state.messages };
    }
    default:
      return state;
  }
}
