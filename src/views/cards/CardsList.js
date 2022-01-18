import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import { CSmartTable } from "@coreui/react-pro";
import { useDispatch, useSelector } from "react-redux";
import { acceptCardAction } from "src/actions/cardActions";

const CardsList = () => {
    const dispatch = useDispatch() ;
  const cardState = useSelector((state) => state["cardReducer"]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const { cardsNotAccepted } = cardState;
    let filterdCards = [];
    cardsNotAccepted.forEach((card) => {
      const { cardNumber, id, csv, dateExpiration, cardHolderName } = card;
      const cardItem = {
        cardNumber,
        csv,
        dateExpiration,
        cardHolderName,
        _cardId: id,
        actions: false,
      };
      filterdCards = [...filterdCards, cardItem];
    });
    setCards(filterdCards);
  }, [cardState]);

  const acceptCard = (card) => {
    const { _cardId: cardId, cardNumber } = card;
    dispatch(acceptCardAction(cardId, cardNumber));
  };

  return (
    <>
      <div className="card-list">
        <CSmartTable
          items={cards}
          columnFilter
          columnSorter
          pagination
          tableProps={{
            hover: true,
          }}
          clickableRows
          scopedColumns={{
            actions: (card) => (
              <td>
                <CButton
                  size="sm"
                  color="outline-success"
                  className="mx-1"
                  onClick={() => acceptCard(card)}
                >
                  accept
                </CButton>
              </td>
            ),
          }}
        />
      </div>
    </>
  );
};

export default CardsList;
