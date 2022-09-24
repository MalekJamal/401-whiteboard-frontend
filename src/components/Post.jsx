import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
const Post = (props) => {
  const [show, setShow] = useState(false);
  const [id, setID] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "80%",
        height: "100%",
        margin: "16px",
        flexDirection: "column",
      }}
    >
      <Row xs={1} md={3} className="g-4">
        {props.posts &&
          props.posts.map((post, idx) => (
            <Col key={idx}>
              <Card
                style={{
                  marginTop: "15px",
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "10px 10px 10px 10px #8888",
                }}
              >
                <Card.Img
                  variant="top"
                  alt="Image"
                  src={post.imgUrl}
                  style={{
                    height: "300px",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
                {post.userEmail === props.logedinEmail && (
                  <div
                    style={{
                      float: "right",
                      clear: "both",
                      marginLeft: "auto",
                      marginTop: "8px",
                      marginRight: "8px",
                      display: "flex",
                      gap: 18,
                    }}
                  >
                    <DeletePost
                      postCreatorEmail={post.userEmail}
                      postID={post.id}
                      getPosts={props.getPosts}
                      logedinEmail={props.logedinEmail}
                      userName={props.userName}
                    />

                    <EditPost
                      postCreatorEmail={post.userEmail}
                      postID={post.id}
                      getPosts={props.getPosts}
                      logedinEmail={props.logedinEmail}
                      userName={props.userName}
                    />
                  </div>
                )}
                <Card.Body style={{ width: "100%" }}>
                  <h4>{post.title}</h4>
                  <Card.Text>{post.body}</Card.Text>
                  {props.isLogedin && (
                    <small style={{ fontSize: "10px" }}>
                      Added By {post.createdBy}
                    </small>
                  )}
                </Card.Body>
                <div
                  style={{
                    width: "80%",
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "15px",
                    marginRight: "15px",
                  }}
                >
                  {props.isLogedin &&
                    post.Comments &&
                    post.Comments.map((comment, idx) => (
                      <Comment
                        key={idx}
                        comment={comment.comment}
                        createdBy={comment.createdBy}
                        date={comment.createdAt}
                        commentID={comment.id}
                        postID={post.id}
                        postCreatorEmail={post.userEmail}
                        logedinEmail={props.logedinEmail}
                        userName={props.userName}
                        commentCreatorEmail={comment.userEmail}
                        getPosts={props.getPosts}
                      />
                    ))}
                  {props.isLogedin && (
                    <>
                      <Button
                        style={{ margin: "14px" }}
                        variant="dark"
                        onClick={() => {
                          handleShow(true);
                          setID(post.id);
                          props.getPosts();
                        }}
                      >
                        Add Comment
                      </Button>
                      <AddCommentForm
                        show={show}
                        handleClose={handleClose}
                        postID={id}
                        email={props.logedinEmail}
                        userName={props.userName}
                        getPosts={props.getPosts}
                        isLogedin={props.isLogedin}
                      />
                    </>
                  )}
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      {props.posts.length === 0 && (
        <Card style={{ margin: "20px", textAlign: "center" }}>
          <Card.Body>
            <h1>Wait !!</h1>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Post;
