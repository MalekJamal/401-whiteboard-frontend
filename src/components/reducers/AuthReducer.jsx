export const ACTIONS = {
    REQUEST_LOGIN: 'REQUEST_LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILD: 'LOGIN_FAILD',
    LOGOUT: 'LOGOUT'
}

const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
const userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')): {}
export const initialState = {
    user: userInfo,
    userName: userInfo.userName,
    token: token,
    errorMessage: null,
    isAuth: token ? true : false,
    loading: true
};
export const AuthReducer = (state, action)=>{

    switch(action.type){
        case ACTIONS.REQUEST_LOGIN: 
        return {
            ...state,
            loading: true
        };
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                token: action.payload.token,
                loading: false,
                isAuth: true
            };
        case ACTIONS.LOGIN_FAILD :
            return {
                ...state,
                loading: false,
                isAuth: false,
                errorMessage: action.payload
            };
        case ACTIONS.LOGOUT:
            return {
                state,
                user: {},
                isAuth: false,
                token: ''
            }        
        default:
            throw new Error(`UNKOWN TYPE..! ${action.type}`);
    }
}