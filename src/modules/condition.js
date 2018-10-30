export const initialState = {
  findUser: undefined
};

export const Istate = {
  findUser: "findUser"
};

export const actionType = {
  SET_VALUE: "CONDITION_SET_VALUE"
};

export function setValue(key, value, dispatch) {
  dispatch({ type: actionType.SET_VALUE, data: { key, value } });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_VALUE:
      state[action.data.key] = action.data.value;
      return state;
    default:
      return state;
  }
}
