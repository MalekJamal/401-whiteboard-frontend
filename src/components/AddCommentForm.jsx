import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
const AddCommentForm = (props) => {
  const [comment, setComment] = useState("");

  const addComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: comment,
      postID: props.postID,
    };
     await axios.post(
      `http://localhost:4000/comment/${props.postID}`,
      data
    );
    props.getPosts();
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                placeholder="Leave a comment here"
                style={{ height: "100%", width: "100%" }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </FloatingLabel>

            <Button variant="success" 
            style={{ margin: "15px" }} type="submit" onClick={props.handleClose}>
              Submit
            </Button>
          </Form>
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
