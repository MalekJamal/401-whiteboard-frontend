import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import { PostContext } from "./PostContext";
import { AuthContext } from "./UserAuth";
import Swal from "sweetalert2";
export const CommentContext = createContext();
const CommentContextProvider = (props) => {
  const { getPosts } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const addComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: e.target.comment.value,
      postID: e.target.postID.value,
      createdBy: user.user.userName,
      userEmail: user.user.email,
    };

    console.log(data);
    await axios
      .post(
        `${process.env.REACT_APP_SERVER}/comment/${parseInt(data.postID)}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        getPosts();
      })
      .catch((e) => console.error(e));
  };
  const deleteComment = async (commentCreatorEmail, commentID) => {
    // "comment/postId/userId"

    Swal.fire({
      title: user.user.userName + ", Are you sure?",
      text: "You won't be able to retrieve this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "light",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${process.env.REACT_APP_SERVER}/comment/${commentID}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          getPosts();
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Not Allowed!!",
          text: "Oops...",
          footer: "Somthing Went Wrong.!!",
          confirmButtonColor: "black",
        });
      });
  };
  const value = { addComment, deleteComment };

  return (
    <CommentContext.Provider value={value}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
