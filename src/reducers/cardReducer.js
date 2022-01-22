import {
  FETCH_CARDS_BY_ACCOUNT_ID,
  SET_SELECTED_CARD,
  FETCH_CARDS_NOT_ACCEPTED,
  ACCEPT_CARD,
} from "src/actions/types";

const initialState = {
  allCards: [],
  cardsByUser: [],
  card: null,
  cardsNotAccepted: [],
};

const cardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CARDS_BY_ACCOUNT_ID:
      return { ...state, cardsByUser: payload };

    case FETCH_CARDS_NOT_ACCEPTED:
      return { ...state, cardsNotAccepted: payload };

    case SET_SELECTED_CARD:
      return { ...state, card: payload };

      case ACCEPT_CARD :
   const filtedCards = state.cardsNotAccepted.filter(
     (el) => el["cardNumber"] !== payload["cardNumber"]
   );
      return { ...state, cardsNotAccepted: filtedCards };


    default:
      return { ...state };
  }
};

export default cardReducer;
