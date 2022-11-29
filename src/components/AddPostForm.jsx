import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { PostContext } from "./contexts/PostContext";
import { useToast } from '@chakra-ui/react'
import { addNewPost } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const AddPostForm = (props) => {
  // const { setPostType, flip, addPost,} = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImage] = useState("");
  const [postType, setPostType] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const canSave = [title, body, imgUrl, postType].every(Boolean) && addRequestStatus === "idle";
  const handleSavePost = (e)=>{
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("currentUser")))
    const data = {
      title,
      body,
      postType,
      imgUrl,
      userEmail: JSON.parse(localStorage.getItem("currentUser")).email,
      createdBy: JSON.parse(localStorage.getItem("currentUser")).userName,
      userID: JSON.parse(localStorage.getItem("currentUser")).id,
    };
    if(canSave){
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost(data));
        setTitle("");
        setBody("");
        setImage("");
        navigate("/");
        toast({
          title: 'Hey!',
          description: "Your Post Added Successfully",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position:"top"   
        });
      } catch (error) {
        toast({
          title: "Somthing went worng!",
          description: "Please try with correct info!!",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position:"top"
        });
        console.log(error);
      } finally{
        setAddRequestStatus("idle");
      }
    }
  }

  // if(flip)
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
        onSubmit={handleSavePost}
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
            onChange={(e)=> setTitle(e.target.value)}
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
            onChange={(e)=> setBody(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Add Image URL</Form.Label>
          <Form.Control
            type="url"
            required
            placeholder="www.image.com"
            name='imgUrl'
            onChange={(e)=> setImage(e.target.value)}
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
      {/* {flip && <Navigate to="/" />} */}
    </div>
  );
};

export default AddPostForm;
