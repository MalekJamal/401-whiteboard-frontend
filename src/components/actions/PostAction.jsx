import axios from 'axios';
import Swal from "sweetalert2";
import {  POST_ACTIONS } from '../reducers/PostReducer';

export const fetchPosts = async(dispatch)=>{

    try {
        await axios
          .get(`${process.env.REACT_APP_SERVER}/post`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            // setPostsData(res.data);
            dispatch({ type: POST_ACTIONS.FETCH_POSTS, payload: res.data});
            // console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
}


export const deleteP = async(dispatch, data) => {
    console.log(data)
    
            await axios.delete(
              `${process.env.REACT_APP_SERVER}/post/${data.id}`,
              {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
              }
            ).then(()=> fetchPosts(dispatch))
             .catch((e) => {
                Swal.fire({
                    icon: "error",
                    title: "Not Allowed!!",
                    text: "Oops...",
                    footer: "Somthing went wrong!!",
                    confirmButtonColor: "black",
                  });
        });
    }


export const addNewPost = async (dispatch, data) => {
   
    await axios
      .post(`${process.env.REACT_APP_SERVER}/post`, data.data, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then(() => {
        data.setFlip(true);
        setTimeout(() => {
          data.setFlip(false);
        }, 100);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Somthing went worng!",
          text: "Please try with correct info!!",
          confirmButtonColor: "black",
        });
        console.error(err);
      });
  };    