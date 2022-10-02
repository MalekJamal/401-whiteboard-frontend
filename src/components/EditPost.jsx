import axios from "axios";
import React, { useState } from "react";
import EditIcon from "../icons/edit.png";
import UpdateModal from "./UpdateModal";
import cookies from "react-cookies";
const EditPost = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [oldPost, setOldPost] = useState([]);

  const getPostByID = async (postCreatorEmail, postID) => {
    if (postCreatorEmail === cookies.load("email")) {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/post/${postID}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.load("token")}`,
          },
        }
      );
      setOldPost(data.data);
      setShow(true);
    }
  };
  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
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
