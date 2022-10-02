import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import cookies from "react-cookies";
const UpdateModal = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [postType, setPostType] = useState("General");

  const updatePost = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title === "" ? props.oldPost.title : title,
      body: body === "" ? props.oldPost.body : body,
      imgUrl: imgUrl === "" ? props.oldPost.imgUrl : imgUrl,
      postType: postType,
    };
    await axios.put(
      `${process.env.REACT_APP_SERVER}/post/${props.postID}`,
      newPost,
      {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );
    props.getPosts();
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={updatePost}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              padding: "15px",
              height: "100%",
              marginTop: "16px",
              marginBottom: "16px",
              flexDirection: "column",
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                required
                maxLength={255}
                defaultValue={`${props.oldPost.title}`}
                placeholder="JavaScript is amazing 😉"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Your Post</Form.Label>
              <Form.Control
                as="textarea"
                required
                maxLength={1024}
                defaultValue={`${props.oldPost.body}`}
                rows={3}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Image URL</Form.Label>
              <Form.Control
                type="url"
                required
                defaultValue={`${props.oldPost.imgUrl}`}
                placeholder="www.image.com"
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </Form.Group>
            <p>Choose The Type Of Your Post</p>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Funny"
                value="Funny"
                name="postType"
                onChange={(e) => setPostType(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Fact"
                value="Fact"
                name="postType"
                onChange={(e) => setPostType(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="General"
                value="General"
                name="postType"
                onChange={(e) => setPostType(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Programming"
                value="Programming"
                name="postType"
                onChange={(e) => setPostType(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={props.handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateModal;
