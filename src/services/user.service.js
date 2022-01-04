import http from "../http-common";


const APIURL = "https://myclientservice.herokuapp.com/api/users/"
class UserService {
  fetchUsers = async () => {
    const { data, error } = await http.get(APIURL);
      return { data, error };
  };
  
  
    fetchUser = async (id) => { 
        const { data, error } = await http.get(APIURL + '/' + id);
    return { data, error };
  }


}

export default new UserService();
