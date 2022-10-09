import { createContext } from "react";
import axios from "axios";
import cookies from "react-cookies";
import { useContext } from "react";
import { PostContext } from "./PostContext";
export const CommentContext = createContext();
const CommentContextProvider = (props) => {
  const { getPosts } = useContext(PostContext);

  const addComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: e.target.comment.value,
      postID: props.postID,
      createdBy: cookies.load("userName"),
      userEmail: cookies.load("email"),
    };
    console.log(data);
    await axios.post(
      `${process.env.REACT_APP_SERVER}/comment/${props.postID}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );
    getPosts();
  };

  const value = { addComment };

  return (
    <CommentContext.Provider value={value}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
