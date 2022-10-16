// import axios from "axios";
import React, { useContext } from "react";
import binIcon from "../icons/bin.png";
// import Swal from "sweetalert2";
// import cookies from "react-cookies";
// import { PostContext } from "./contexts/PostContext";
import { CommentContext } from "./contexts/CommentContext";
const DeleteComment = (props) => {
  // const {getPosts } = useContext(PostContext);
  const {deleteComment } = useContext(CommentContext);
  
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
      onClick={() => deleteComment(props.commentCreatorEmail, props.commentID)}
    />
  );
};

export default DeleteComment;
