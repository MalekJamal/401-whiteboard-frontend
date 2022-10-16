import axios from 'axios';
import { ACTIONS } from '../reducers/AuthReducer';
import { postState } from '../reducers/PostReducer';
import Swal from "sweetalert2";
export const login = async (dispatch, payload)=>{

    try {
        dispatch({ type: ACTIONS.REQUEST_LOGIN});
        
        await axios
        .post(
          `${process.env.REACT_APP_SERVER}/signin`,
          {},
          {
            headers: {
              Authorization: `Basic ${payload}`,
            },
          }
        )
        .then((res) => {
        console.log(res.data);
        dispatch({type: ACTIONS.LOGIN_SUCCESS, payload: res.data});
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        localStorage.setItem('userName', JSON.stringify(res.data.userName));
        })
        .catch((e) => {
          dispatch({type: ACTIONS.LOGIN_FAILD, payload: e});
          Swal.fire({
            icon: "error",
            title: "Enter correct Info!",
            text: "Please try with correct info!!",
            confirmButtonColor: "black",
          });
        });
    } catch (error) {
        dispatch({type: ACTIONS.LOGIN_FAILD, payload: error});
        
    }
}

export const logoutHandler = (dispatch) =>{
    dispatch({type: ACTIONS.LOGOUT});
    // postState = [];
    localStorage.clear();
}