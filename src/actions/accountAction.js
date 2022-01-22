import AccountService from "src/services/account.service";
import {
  ERROR_ACTION,
  FETCH_ACCOUNTS_BY_USER,
  SET_SELECTED_ACCOUNT,
} from "./types";

export const fetchAccountByUser = (userId) => async (dispatch) => {
  try {
    const { data, error } = await AccountService.getAccountByUser(userId);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.resolve(error);
    } else {
      dispatch({
        type: FETCH_ACCOUNTS_BY_USER,
        payload: data,
      });
      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const enableOrDisableAccountAction =
  ({ accountId, action }) =>
  async (dispatch) => {
    try {
      const { data, error } = await AccountService.enableOrDisableAccount({
        accountId,
        action,
      });
      if (error) {
        dispatch({
          type: ERROR_ACTION,
          payload: error.message,
        });
        return Promise.resolve(error);
      } else {
        dispatch({
          type: SET_SELECTED_ACCOUNT,
          payload: data,
        });
        return Promise.resolve(data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };
