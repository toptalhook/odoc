import { AppActions } from "../actions";

export const handleRedux = (type: AppActions, data?: any) => ({
  type,
  ...data,
});
