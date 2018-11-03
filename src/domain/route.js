import { setConditionValue, Icondition } from "../modules/condition";

export const toDm = (props, id) => {
  const { history, dispatch } = props;
  setConditionValue(Icondition.dmUserId, id, dispatch);
  if (history) history.push("/dm");
};

export const toUser = (props, id) => {
  const { history, dispatch } = props;
  setConditionValue(Icondition.findUser, id, dispatch);
  if (history) history.push("/user");
};

export const toMain = props => {
  const { history } = props;
  if (history) history.push("/main");
};
