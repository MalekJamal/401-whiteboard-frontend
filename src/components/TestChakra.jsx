// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Radio,
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Form } from "react-bootstrap";
// import { useContext, useEffect, useState } from "react";
// import { PostContext } from "./contexts/PostContext";
// import axios from "axios";

// const TestChakra = (props) => {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [imgUrl, setImgUrl] = useState("");
//   const [postType, setPostType] = useState("General");

//   const { getPosts } = useContext(PostContext);

//   const updatePost = async (e) => {
//     e.preventDefault();
//     const newPost = {
//       title: title === "" ? props.oldPost.title : title,
//       body: body === "" ? props.oldPost.body : body,
//       imgUrl: imgUrl === "" ? props.oldPost.imgUrl : imgUrl,
//       postType: postType,
//     };
//     await axios.put(
//       `${process.env.REACT_APP_SERVER}/post/${props.postID}`,
//       newPost,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     getPosts();
//   };
//   return (
//     <>
//       <Modal isOpen={props.isOpen} onClose={props.onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Post</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <form
//               onSubmit={updatePost}
//               style={{
//                 display: "flex",
//                 width: "100%",
//                 justifyContent: "center",
//                 alignContent: "center",
//                 padding: "15px",
//                 height: "100%",
//                 marginTop: "16px",
//                 marginBottom: "16px",
//                 flexDirection: "column",
//               }}
//             > 
//               <Form.Group className="mb-3">
//                 <Form.Control
//                   as="textarea"
//                   required
//                   maxLength={1024}
//                   // defaultValue={`${props.oldPost.body}`}
//                   rows={3}
//                   onChange={(e) => setBody(e.target.value)}
//                 />
//               </Form.Group>
              
//               <Button colorScheme="green" type="submit" onClick={props.onClose}>
//                 Save Changes
//               </Button>
//             </form>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="red" mr={3} onClick={props.onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default TestChakra;
