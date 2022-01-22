import { CARD_URL } from ".";
import http from "../http-common";

class CardService {
  getCardsByAccountId = async (accountId) => {
    const { data, error } = await http.get(
      `${CARD_URL}getAccountCards?accountId=${accountId}`
    );
    return { data, error };
  };

  enableOrDisableCard = async ({ cardId, action }) => {
    const { data, error } = await http.post(`${CARD_URL}${action}`, {
      id: cardId,
    });
    return { data, error };
  };

  acceptCard = async (cardId) => {
    const { data, error } = await http.put(`${CARD_URL}accept/${cardId}`, {});
    return { data, error };
  };

  getCardsNoAccepted = async () => {
    const { data, error } = await http.get(`${CARD_URL}getNotAcceptable`);
    return { data, error };
  };
}
export default new CardService();
