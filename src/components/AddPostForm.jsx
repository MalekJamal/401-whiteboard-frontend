import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "./contexts/PostContext";
const AddPostForm = (props) => {
  const { setPostType, flip, addPost,} = useContext(PostContext);

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
            name='title'
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Your Post</Form.Label>
          <Form.Control
            as="textarea"
            required
            maxLength={1024}
            rows={3}
            name='body'
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Image URL</Form.Label>
          <Form.Control
            type="url"
            required
            placeholder="www.image.com"
            name='imgUrl'
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
      {flip && <Navigate to="/" />}
    </div>
  );
};

export default AddPostForm;
