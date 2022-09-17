import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
import { useAuth0 } from "@auth0/auth0-react";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
const Post = (props) => {
  const [show, setShow] = useState(false);
  const [id, setID] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isAuthenticated } = useAuth0();

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
                {isAuthenticated && post.userEmail ? (
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
                    />

                    <EditPost
                      postCreatorEmail={post.userEmail}
                      postID={post.id}
                      getPosts={props.getPosts}
                    />
                  </div>
                ) : (
                  <b></b>
                )}
                <Card.Body style={{ width: "100%" }}>
                  <h4>{post.title}</h4>
                  <Card.Text>{post.body}</Card.Text>
                  <small style={{ fontSize: "10px" }}>
                    Added By {post.createdBy}
                  </small>
                </Card.Body>
                <Card.Footer
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {post.Comments &&
                    post.Comments.map((comment, idx) => (
                      <Comment
                        key={idx}
                        comment={comment.comment}
                        createdBy={comment.createdBy}
                        date={comment.createdAt}
                      />
                    ))}

                  <Button
                    style={{ margin: "5px" }}
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
                    getPosts={props.getPosts}
                  />
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Post;
