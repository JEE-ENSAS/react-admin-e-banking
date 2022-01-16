import { usersData } from "src/mock-data/users";
import { DISABLE_USER, ENABLE_USER, FETCH_USER, FETCH_USERS } from "../actions/types";



const initialState = {
    users: [],
    user: {},
    sidebarShow: true,
    sidebarUnfoldable: true,
};

function userReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_USERS:
            return {
                ...state,
                users: payload['users'],
            };

        case FETCH_USER:
            return {
                ...state,
                user: payload['user'],
            }

        case ENABLE_USER:
            return {
                ...state,
                user: payload['user'],
            };

        case DISABLE_USER:
            return {
                ...state,
                user: payload['user'],
            };

        case 'set':
            return { ...state, sidebarShow: !payload, sidebarUnfoldable: false };

        default:
            return state;
    }
}

export default userReducer;
