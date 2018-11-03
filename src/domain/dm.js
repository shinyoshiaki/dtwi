import { setConditionValue, Icondition } from "../modules/condition";

export const toDm = (props, id) => {
  const { history, dispatch } = props;
  setConditionValue(Icondition.dmUserId, id, dispatch);
  if (history) history.push("/dm");
};
