import axios from "axios";
import React, { useState } from "react";
import EditIcon from "../icons/edit.png";
import UpdateModal from "./UpdateModal";
import { useDisclosure } from "@chakra-ui/react";
import TestChakra from "./TestChakra";
const EditPost = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [oldPost, setOldPost] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPostByID = async (postID) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/post/${postID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setOldPost(data);
    setShow(onOpen);
  };

  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
        onClick={() => getPostByID(props.postID)}
        title="Edit"
        src={EditIcon}
        alt="Edit"
        width={"20px"}
      />
      <UpdateModal
        oldPost={oldPost}
        postID={props.postID}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default EditPost;
