import AgencyService from "src/services/agency.service";
import {
  ERROR_ACTION,
  FETCH_AGENCIES
} from "./types";


export const getListAgenciesAction = () => async (dispatch) => {
  try {
    const { data, error } = await AgencyService.getListAgencies();
    const params = {
      type: error ? ERROR_ACTION : FETCH_AGENCIES,
      payload: error ? error : { items: data },
    };
    dispatch(params);
  } catch (error) {
    dispatch({ type: ERROR_ACTION, payload: error.message });
  }
};

