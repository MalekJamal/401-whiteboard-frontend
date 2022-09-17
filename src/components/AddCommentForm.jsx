import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const AddCommentForm = (props) => {
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useAuth0();
  const addComment = async (e) => {
    e.preventDefault();
    const data = {
      comment: comment,
      postID: props.postID,
      createdBy: user.name,
      userEmail: user.email
    };//
    await axios.post(
      `${process.env.REACT_APP_SERVER}/comment/${props.postID}`,
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
          {!isAuthenticated && <h3>Plz Login!!</h3>}

          {isAuthenticated && (
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
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </FloatingLabel>

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
          )}
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
