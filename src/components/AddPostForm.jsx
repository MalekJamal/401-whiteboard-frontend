import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddPostForm = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [postType, setPostType] = useState("General");

  const addPost = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      body: body,
      postType: postType,
      imgUrl: imgUrl,
      userEmail: props.email,
      createdBy: props.userName,
    };
    await axios.post(`${process.env.REACT_APP_SERVER}/post`, data);
    props.getPosts();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "55%",
        height: "100%",
        marginTop: "25px",
        marginBottom: "8px",
        flexDirection: "column",
        boxShadow: "10px 10px 10px 10px #8888",
        borderRadius: "10px",
      }}
    >
      <Form
        onSubmit={addPost}
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
            data-testid="title"
            required
            maxLength={255}
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
            rows={3}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Image URL</Form.Label>
          <Form.Control
            type="url"
            required
            placeholder="www.image.com"
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </Form.Group>
        <p>Choose The Type Of Your Post</p>
        <Form.Select
          onChange={(e) => setPostType(e.target.value)}
          className="mb-3"
          variant="dark"
        >
          <option value="General">General</option>
          <option value="Funny">Funny</option>
          <option value="Fact">Fact</option>
          <option value="Programming">Programming</option>
        </Form.Select>
        <Button variant="dark" type="submit">
          Add Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPostForm;
