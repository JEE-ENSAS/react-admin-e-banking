import { CARD_URL } from ".";
import http from '../http-common'

class CardService {

    getCardsByAccountId = async (accountId) => {

        const { data, error } = await http.get(
          `${CARD_URL}getAccountCards?accountId=${accountId}`
        );
      return { data, error };
    }

}

export default new CardService();