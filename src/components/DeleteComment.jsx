import axios from "axios";
import React, { useContext } from "react";
import binIcon from "../icons/bin.png";
import Swal from "sweetalert2";
import cookies from "react-cookies";
import { PostContext } from "./contexts/PostContext";
const DeleteComment = (props) => {
  const {getPosts } = useContext(PostContext);
  const deleteComment = async () => {
    // "comment/postId/userId"
    
      Swal.fire({
        title: cookies.load("userName") + ", Are you sure?",
        text: "You won't be able to retrieve this comment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "light",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${process.env.REACT_APP_SERVER}/comment/${props.commentID}`,
            {
              headers: {
                Authorization: `Bearer ${cookies.load("token")}`,
              },
            }
          );
          getPosts();
        }
      }).catch((e)=>{
        Swal.fire({
          icon: "error",
          title: "Not Allowed!!",
          text: "Oops...",
          footer: "Somthing Went Wrong.!!",
          confirmButtonColor: "black",
        });
      });
    
  };
  return (
    <img
      src={binIcon}
      alt=""
      style={{
        textAlign: "right",
        padding: "2px",
        width: "26%",
        marginTop: "3px",
        cursor: "pointer",
        marginLeft: "auto",
      }}
      onClick={() => deleteComment(props.commentCreatorEmail)}
    />
  );
};

export default DeleteComment;
