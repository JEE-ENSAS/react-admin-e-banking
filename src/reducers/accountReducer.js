import {
  FETCH_ACCOUNTS_BY_USER,
  SET_SELECTED_ACCOUNT,
} from "src/actions/types";

const initialState = {
  allAccounts: [],
  accountsByUser: [],
  account: null,
};

const accountReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ACCOUNTS_BY_USER:
      return { ...state, accountsByUser: payload };

    case SET_SELECTED_ACCOUNT:
      return { ...state, account: payload };

    default:
      return { ...state };
  }
};

export default accountReducer;
