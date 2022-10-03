import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import cookies from "react-cookies";
import video from "../icons/video.mp4";
const Post = (props) => {
  const [show, setShow] = useState(false);
  const [id, setID] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (cookies.load("token")) {
      props.getPosts();
    }
  }, []);
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
                {"admin" === cookies.load("role") && (
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
                        getPosts={props.getPosts}
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
          <div
            style={{
              textAlign: "center",
              boxShadow: "10px 8px 8px 10px gray",
              borderRadius: "5px",
              padding: "3px",
              margin: "20px",
              width: "100%",
            }}
          >
            <h1>Plz Login To See All Posts !!</h1>
            <video
              width="100%"
              muted
              autoPlay
              loop
              style={{ objectFit: "contain" }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Post;
