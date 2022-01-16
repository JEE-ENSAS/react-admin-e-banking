
import { ACCOUNT_URL } from '.';
import http from '../http-common'

 class AccountService {
   getAccountByUser = async (userId) => {
     const { data, error } = await http.get(`${ACCOUNT_URL}getUserAccounts?userId=${userId}`);
     return { data, error };
   };
 } 

 export default new AccountService();