import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, ERROR_ACTION } from "./types";
import AuthService from "../services/auth.service";
import { showSuccessSwal } from "../helpers/SweetAlert";

export const loginAction = (loginForm) => async (dispatch) => {
  try {
    const { data, error } = await AuthService.login(loginForm);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: data,
      });
      return Promise.resolve(error);
    } else {
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles,
      }
      dispatch({
        type: AUTH_LOGIN,
        payload: { user, token: data.accessToken },
      });
      console.log('data', data)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      showSuccessSwal({ title: `you're log in ` })
      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};


export const registerAction = (registerForm) => async (dispatch) => {
  try {
    const { data, error } = await AuthService.register(registerForm);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: data,
      });
      return Promise.resolve(error);
    } else {
      dispatch({
        type: AUTH_REGISTER,
        payload: data,
      });
      showSuccessSwal({ title: data.message })

      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}


export const logOutAction = () => (dispatch) => {

  dispatch({ type: AUTH_LOGOUT, payload: {} })

}