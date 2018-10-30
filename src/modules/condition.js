export const initialState = {
  findUser: undefined,
  selectFile: undefined
};

export const Istate = {
  findUser: "findUser",
  selectFile: "selectFile"
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
      return { ...state, [action.data.key]: action.data.value };
    default:
      return state;
  }
}
