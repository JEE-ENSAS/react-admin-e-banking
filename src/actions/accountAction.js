import AccountService from "src/services/account.service";
import { ERROR_ACTION, FETCH_ACCOUNTS_BY_USER } from "./types";


export const fetchAccountByUser = (userId) => async (dispatch) => {
  try {
    const { data, error } = await AccountService.getAccountByUser(userId);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: {},
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