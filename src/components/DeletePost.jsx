import React, { useContext } from "react";
import deletIcon from "../icons/bin.png";
import { PostContext } from "./contexts/PostContext";
const DeletePost = (props) => {
  
  const { deletePost } = useContext(PostContext);

  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
        title="Delete"
        src={deletIcon}
        alt="delete"
        width={"20px"}
        onClick={() => {
          deletePost(props.postID);
        }}
      />
    </div>
  );
};

export default DeletePost;
