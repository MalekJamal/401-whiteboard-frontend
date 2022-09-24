import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import EditIcon from "../icons/edit.png";
import UpdateModal from "./UpdateModal";
const EditPost = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [oldPost, setOldPost] = useState([]);

  const getPostByID = async (postCreatorEmail, postID) => {
    if (postCreatorEmail === props.logedinEmail) {
      const data = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER}/post/${postID}`);
      setOldPost(data.data);
      setShow(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Not Allowed!!",
        text: "Oops...",
        footer: "You can't edit others posts!!",
        confirmButtonColor: "black",
      });
    }
  };
  return (
    <div>
      <img
      style={{cursor:"pointer"}}
        onClick={() => getPostByID(props.postCreatorEmail, props.postID)}
        title="Edit"
        src={EditIcon}
        alt="delete"
        width={"20px"}
      />
      <UpdateModal
        show={show}
        handleClose={handleClose}
        oldPost={oldPost}
        postID={props.postID}
        getPosts={props.getPosts}
      />
    </div>
  );
};

export default EditPost;
