import http from "../http-common";

const APIURL = "https://my-authentication-service-jwt.herokuapp.com/api/auth/"

class AuthService {
  login = async (loginForm) => {
    const { data, error } = await http.post(APIURL + 'signin', loginForm);
    return { data, error };
  };
  
  
  register = async (registerForm) => { 
    const { data, error } = await http.post(APIURL+'signup' , registerForm);
    return { data, error };
  }


}

export default new AuthService();
