import CardService from "src/services/card.service";
import { ERROR_ACTION, FETCH_CARDS_BY_ACCOUNT_ID, SET_SELECTED_CARD } from "./types";

export const fetchCardsByAccountId = (accountId) => async (dispatch) => {
  try {
    const { data, error } = await CardService.getCardsByAccountId(accountId);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.resolve(error);
    } else {
      dispatch({
        type: FETCH_CARDS_BY_ACCOUNT_ID,
        payload: data,
      });
      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};


export const enableOrDisableCardAction =
  ({ cardId, action }) =>
  async (dispatch) => {
    try {
      const { data, error } = await CardService.enableOrDisableCard({
        cardId,
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
          type: SET_SELECTED_CARD,
          payload: data,
        });
        return Promise.resolve(data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };
