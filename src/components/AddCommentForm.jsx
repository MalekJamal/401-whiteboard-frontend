import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { CommentContext } from "./contexts/CommentContext";
const AddCommentForm = (props) => {
  // const [comment, setComment] = useState("");
  // const {getPosts } = useContext(PostContext);
  const {addComment} = useContext(CommentContext);
 
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form
              onSubmit={addComment}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <FloatingLabel label="Comments">
                <Form.Control
                  as="textarea"
                  required
                  maxLength={255}
                  placeholder="Leave a comment here"
                  style={{ height: "100%", width: "100%" }}
                  name='comment'
                  
                />
              </FloatingLabel>
              <input hidden name='postID' defaultValue={props.postID}/>
              <Button
                variant="dark"
                style={{ margin: "15px" }}
                type="submit"
                onClick={props.handleClose}
              >
                Submit
              </Button>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCommentForm;
