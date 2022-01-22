import { TRANSFERT_CLIENT_URL } from ".";
import axios from "../http-common";

class TransferService {
  getListTransfers = async () => {
    const { data, error } = await axios.get(TRANSFERT_CLIENT_URL + "transfers");
    return { data, error };
  };
}

export default new TransferService();
