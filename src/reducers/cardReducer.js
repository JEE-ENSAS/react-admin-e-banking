import { FETCH_CARDS_BY_ACCOUNT_ID, SET_SELECTED_CARD } from "src/actions/types";

const initialState = {
  allCards: [],
  cardsByUser: [],
  card: null,
};

const cardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CARDS_BY_ACCOUNT_ID:
      return { ...state, cardsByUser: payload };

    case SET_SELECTED_CARD:
      return { ...state, card: payload };

    default:
      return { ...state };
  }
};

export default cardReducer;
