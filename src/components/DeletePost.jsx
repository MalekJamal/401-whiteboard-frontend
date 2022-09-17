import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import deletIcon from "../icons/bin.png";
import Swal from "sweetalert2";
const DeletePost = (props) => {
  const { user } = useAuth0();

  const deletePost = (postCreatorEmail) => {
    if (postCreatorEmail === user.email) {
      Swal.fire({
        title: user.name + ", Are you sure?",
        text: "You won't be able to retrieve this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "light",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${process.env.REACT_APP_SERVER}/post/${props.postID}`);
          props.getPosts();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Allowed!!",
        text: "Oops...",
        footer: "You can't delete others posts!!",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <div>
      <img
        title="Delete"
        src={deletIcon}
        alt="delete"
        width={"20px"}
        onClick={() => {
          deletePost(props.postCreatorEmail);
        }}
      />
    </div>
  );
};

export default DeletePost;
