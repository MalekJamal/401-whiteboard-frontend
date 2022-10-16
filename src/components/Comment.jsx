import Toast from "react-bootstrap/Toast";
import DeleteComment from "./DeleteComment";
import { useContext } from "react";
import { AuthContext } from "./contexts/UserAuth";
function Comment(props) {
  const { user } = useContext(AuthContext);
  return (
    <Toast style={{ marginTop: "8px", marginBottom: "8px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <div
          style={{ margin: "5px", width: "max-content", textAlign: "right" }}
        >
          <small
            style={{ margin: "5px", width: "max-content", textAlign: "right" }}
          >
            {props.createdBy}
          </small>
        </div>
        <div style={{ float: "left", width: "max-content", margin: "5px" }}>
          <small>{props.date.substring(0, 10)}</small>
        </div>
        {(user.user.role === "admin" ||
          props.commentCreatorEmail === user.user.email) && (
          <DeleteComment
            commentID={props.commentID}
            createdBy={props.createdBy}
            commentCreatorEmail={props.commentCreatorEmail}
            postID={props.postID}
            getPosts={props.getPosts}
          />
        )}
      </div>
      <Toast.Body>{props.comment}</Toast.Body>
    </Toast>
  );
}

export default Comment;
