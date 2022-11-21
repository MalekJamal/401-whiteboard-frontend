import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Radio,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  
} from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "./contexts/PostContext";
import axios from "axios";
const UpdateModal = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [postType, setPostType] = useState("General");

  const { getPosts } = useContext(PostContext);

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getPosts();
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
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
                <Form.Control
                  type="title"
                  required
                  maxLength={255}
                  // defaultValue={`${props.oldPost.title}`}
                  placeholder="JavaScript is amazing 😉"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  required
                  maxLength={1024}
                  // defaultValue={`${props.oldPost.body}`}
                  rows={3}
                  onChange={(e) => setBody(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Add Image URL</FormLabel>
                <Form.Control
                  type="url"
                  required
                  // defaultValue={`${props.oldPost.imgUrl}`}
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
              <Button colorScheme="green" type="submit" onClick={props.onClose}>
                Save Changes
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
