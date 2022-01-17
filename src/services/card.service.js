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
}

export default new CardService();
