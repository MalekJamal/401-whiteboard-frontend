import axios from "axios";
import React from "react";
import deletIcon from "../icons/bin.png";
import Swal from "sweetalert2";
import cookies from "react-cookies";
const DeletePost = (props) => {
  const deletePost = (postCreatorEmail) => {
    console.log()
    if ('admin' === cookies.load("role")) {
      Swal.fire({
        title: "Mr "+cookies.load("userName") + ", Are you sure?",
        text: "You won't be able to retrieve this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "light",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${process.env.REACT_APP_SERVER}/post/${props.postID}`,
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
        footer: "You can't delete others posts!!",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
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
