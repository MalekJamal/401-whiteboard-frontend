import axios from "axios";
import React from "react";
import binIcon from "../icons/bin.png";
import Swal from "sweetalert2";
import cookies from "react-cookies";
const DeleteComment = (props) => {
  const deleteComment = async () => {
    // "comment/postId/userId"
    if (props.commentCreatorEmail === cookies.load("email")) {
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
      onClick={() => deleteComment(props.commentCreatorEmail)}
    />
  );
};

export default DeleteComment;
