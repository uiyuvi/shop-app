import { SIGN_IN } from "../actions/auth";

const initialState = {
    isLoggedIn: false,
    userId: "",
    token: ""
}

export const authReducer = (state = initialState, action) => {
    if (action.type === SIGN_IN) {
        return {
            ...state,
            isLoggedIn: true,
            userId: action.userId,
            token: action.token
        }
    }
    return state;
}