import axios from "axios";
import cookies from "react-cookies";
import { useState, createContext } from "react";
import Swal from "sweetalert2";
export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [postsData, setPostsData] = useState([]);
  const [postType, setPostType] = useState("General");
  const [flip, setFlip] = useState(false);

  const addPost = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      body: e.target.body.value,
      postType: postType,
      imgUrl: e.target.imgUrl.value,
      userEmail: cookies.load("email"),
      createdBy: cookies.load("userName"),
      userID: cookies.load("userId"),
    };
    await axios
      .post(`${process.env.REACT_APP_SERVER}/post`, data, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then(() => {
        setFlip(true);
        setTimeout(() => {
          setFlip(false);
        }, 100);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Somthing went worng!",
          text: "Please try with correct info!!",
          confirmButtonColor: "black",
        });
        console.error(err);
      });
  };

  const getPosts = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER}/post`, {
          headers: {
            Authorization: `Bearer ${cookies.load("token")}`,
          },
        })
        .then((res) => {
          setPostsData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = (postID) => {
    if (postID) {
      Swal.fire({
        title: "Mr " + cookies.load("userName") + ", Are you sure?",
        text: "You won't be able to retrieve this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "light",
        confirmButtonText: "Yes, delete it!",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(
              `${process.env.REACT_APP_SERVER}/post/${postID}`,
              {
                headers: {
                  Authorization: `Bearer ${cookies.load("token")}`,
                },
              }
            );
            getPosts();
          } /// i changed here
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Not Allowed!!",
            text: "Oops...",
            footer: "You can't delete others posts!!",
            confirmButtonColor: "black",
          });
          console.log(e);
        });
    }
  };
  const value = {
    postsData,
    getPosts,
    addPost,
    setPostType,
    flip,
    deletePost,
    setFlip,
    setPostsData,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};

export default PostContextProvider;
