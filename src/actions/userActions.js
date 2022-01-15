import UserService from "../services/user.service";
import { ERROR_ACTION, FETCH_USER, FETCH_USERS } from "./types";

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data, error } = await UserService.fetchUsers();
        if (error) {
            dispatch({
                type: ERROR_ACTION,
                payload: {},
            });
            return Promise.reject(error);
        } else {
            dispatch({
                type: FETCH_USERS,
                payload: { users: data },
            });
            return Promise.resolve(data);
        }
    } catch (err) {
        return Promise.reject(err);
    }
};


export const fetchUser = (userId) => async (dispatch) => {
    try {
        const { data, error } = await UserService.fetchUser(userId);
        if (error) {
            dispatch({
                type: ERROR_ACTION,
                payload: {},
            });
            return Promise.resolve(error);
        } else {
            dispatch({
                type: FETCH_USER,
                payload: data,
            });
            return Promise.resolve(data);
        }
    } catch (err) {
        return Promise.reject(err);
    }
}