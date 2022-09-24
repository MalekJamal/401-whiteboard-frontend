import axios from "axios";
import React from "react";
import binIcon from "../icons/bin.png";
import Swal from "sweetalert2";
const DeleteComment = (props) => {
  const deleteComment = async () => {
    // "comment/postId/userId"
    if (props.commentCreatorEmail === props.logedinEmail) {
      Swal.fire({
        title: props.userName + ", Are you sure?",
        text: "You won't be able to retrieve this comment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "light",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${process.env.REACT_APP_LOCAL_SERVER}/comment/${props.commentID}`
          );
          props.getPosts();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Allowed!!",
        text: "Oops...",
        footer: "You can't delete others comments!!",
        confirmButtonColor: "black",
      });
    }
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
      onClick={deleteComment}
    />
  );
};

export default DeleteComment;
