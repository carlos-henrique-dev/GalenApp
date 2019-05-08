export const Types = {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
    USER_LOGIN_ERROR: "USER_LOGIN_ERROR"
};

const initialState = {
    id: "",
    email: "",
    name: "",
    token: "",
    isLogged: null,
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.USER_LOGIN:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                token: action.payload.token,
                isLogged: true
            };
        default:
            return state;
    }
}

export function userLogin(data) {
    return {
        type: Types.USER_LOGIN,
        payload: {
            id: data.costumerID,
            email: data.costumerEmail,
            name: data.costumerName,
            token: data.token
        }
    };
}
