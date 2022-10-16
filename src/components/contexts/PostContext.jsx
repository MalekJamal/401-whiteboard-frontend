import { useState, createContext } from "react";
import Swal from "sweetalert2";
import { fetchPosts, deleteP, addNewPost } from "../actions/PostAction";
import { useReducer } from "react";
import { postReducer, postState } from "../reducers/PostReducer";
import { useContext } from "react";
import { AuthContext } from "../contexts/UserAuth";
export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [postType, setPostType] = useState("General");
  const [flip, setFlip] = useState("");
  const [postsData, dispatch] = useReducer(postReducer, postState);
  const { user } = useContext(AuthContext);

  const addPost = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      body: e.target.body.value,
      postType: postType,
      imgUrl: e.target.imgUrl.value,
      userEmail: user.user.email,
      createdBy: user.user.userName,
      userID: user.user.id,
    };

    addNewPost(dispatch, { data, token: user.token, flip, setFlip });
  };

  const getPosts = () => {
    try {
      fetchPosts(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postID) => {
    try {
      const token = localStorage.getItem("token");

      getPosts();
      if (postID) {
        Swal.fire({
          title:
            "Mr " +
            JSON.parse(localStorage.getItem("userName")) +
            ", Are you sure?",
          text: "You won't be able to retrieve this post!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "red",
          cancelButtonColor: "light",
          confirmButtonText: "Yes, delete it!",
        })
          .then(async (result) => {
            if (result.isConfirmed) {
              deleteP(dispatch, { id: postID, token });
              getPosts();
            }
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Not Allowed!!",
              text: "Oops...",
              footer: "Somthing went wrong!!",
              confirmButtonColor: "black",
            });
            console.log(e);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    postsData,
    getPosts,
    addPost,
    setPostType,
    flip,
    deletePost,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};

export default PostContextProvider;
