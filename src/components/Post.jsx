import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddCommentForm from "./AddCommentForm";

const Post = (props) => {
  const [show, setShow] = useState(false);
  const [id, setID] = useState(false);

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
      <Row xs={1} md={3} className="g-3">
        {props.posts &&
          props.posts.map((post, idx) => (
            <Col key={idx}>
              <Card
                style={{
                    
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  boxShadow:"10px 10px 10px 10px #8888"
                }}
              >
                <Card.Img variant="top" src={post.imgUrl} />
                <Card.Body>
                  <h3>
                    {post.title}
                  </h3>
                  <Card.Text>{post.body}</Card.Text>
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
                      <ul
                        key={idx}
                        style={{
                          border: "2px solid black",
                          listStyleType: "none",
                          borderRadius: "5px",
                        }}
                      >
                        <li style={{width:"100%", textAlign:"center"}}>{comment.comment} </li>
                      </ul>
                    ))}
                  <Button
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
