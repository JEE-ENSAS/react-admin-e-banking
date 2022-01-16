import { FETCH_CARDS_BY_ACCOUNT_ID } from "src/actions/types";

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

    default:
      return { ...state };
  }
};

export default cardReducer;
