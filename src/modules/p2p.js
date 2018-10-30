export const initialState = {
  targetUrl: undefined,
  node: undefined,
  kad: undefined
};

export const Istate = {
  targetUrl: "targetUrl",
  node: "node",
  kad: "kad"
};

export const actionType = {
  SET_VALUE: "SET_VALUE"
};

export function setValue(key, value, dispatch) {
  dispatch({ type: actionType.SET_VALUE, data: { key, value } });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_VALUE:
      return { ...state, [action.data.key]: action.data.value };

    default:
      return state;
  }
}
