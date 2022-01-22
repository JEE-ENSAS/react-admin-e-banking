import TransferService from "../services/TransferService";
import { ERROR_ACTION, FETCH_TRANSFETS } from "./types";

export const getListTransfersAction = () => async (dispatch) => {
  try {
    const { data, error } = await TransferService.getListTransfers();
    const params = {
      type: error ? ERROR_ACTION : FETCH_TRANSFETS,
      payload: error ? error : { items: data },
    };
    dispatch(params);
  } catch (error) {
    dispatch({ type: ERROR_ACTION, payload: error.message });
  }
};
