export const initialState = {
  findUser: undefined,
  selectFile: undefined,
  dmUserId: undefined,
  loading: false,
  nofiticationOpen: false,
  nofiticationMessage: ""
};

export const Icondition = {
  findUser: "findUser",
  selectFile: "selectFile",
  dmUserId: "dmUserId",
  loading: "loading",
  nofiticationOpen: "nofiticationOpen",
  nofiticationMessage: "nofiticationMessage"
};

export const actionType = {
  SET_VALUE: "CONDITION_SET_VALUE"
};

export function setConditionValue(key, value, dispatch) {
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
