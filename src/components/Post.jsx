import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import video from "../icons/video.mp4";
import { AuthContext } from "./contexts/UserAuth";
import { PostContext } from "./contexts/PostContext";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/post/postSlice";
const Post = (props) => {
  const [show, setShow] = useState(false);
  const [id, setID] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext);
  const {  getPosts } = useContext(PostContext);
  const postsData = useSelector(selectAllPosts);
  useEffect(() => {
    if (user.isAuth) {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
    >
      {postsData &&
        postsData.map((post, idx) => (
          <Card
          key={idx}
            maxW="md"
            style={{
              marginTop: "15px",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              boxShadow: "10px 10px 10px 10px #8888",
            }}
          >
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name={post.createdBy}
                  />

                  <Box>
                    <Heading size="sm">{post.createdBy}</Heading>
                    {/* <Text>{post.createdBy}</Text> */}
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Image
                objectFit="cover"
                src={post.imgUrl}
                alt={post.title}
                //   style={{
                //     height: "300px",
                //     maxHeight: "300px"
                //   }}
              />
              {(user.user.role === "admin" ||
                post.userEmail === user.user.email) && (
                <Box
                  style={{
                    float: "right",
                    clear: "both",
                    marginLeft: "auto",
                    marginTop: "8px",
                    marginRight: "8px",
                    display: "flex",
                    gap: 18,
                  }}
                  key={user.user.id}
                >
                  <DeletePost
                    postCreatorEmail={post.userEmail}
                    postID={post.id}
                  />

                  <EditPost
                    postCreatorEmail={post.userEmail}
                    postID={post.id}
                  />
                </Box>
              )}
              <br />
              <Box>
                <h4>{post.title}</h4>
                <Text>{post.body}</Text>
              </Box>
            </CardBody>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              {user.isAuth &&
                post.Comments &&
                post.Comments.map((comment, idx) => (
                  <Comment
                    key={idx}
                    comment={comment.comment}
                    createdBy={comment.createdBy}
                    date={comment.createdAt}
                    commentID={comment.id}
                    postID={post.id}
                    postCreatorEmail={post.userEmail}
                    commentCreatorEmail={comment.userEmail}
                    getPosts={props.getPosts}
                  />
                ))}
              {user.isAuth && (
                <>
                  <Button
                    flex="1"
                    variant="ghost"
                    style={{ margin: "0px" }}
                    onClick={() => {
                      handleShow(true);
                      setID(post.id);
                      getPosts();
                    }}
                  >
                    Comment
                  </Button>
                  <AddCommentForm
                    show={show}
                    handleClose={handleClose}
                    postID={id}
                    getPosts={props.getPosts}
                  />
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      {postsData.length === 0 && (
        <Card style={{ margin: "20px", textAlign: "center" }}>
          <div
            style={{
              textAlign: "center",
              boxShadow: "10px 8px 8px 10px gray",
              borderRadius: "5px",
              padding: "3px",
              margin: "20px",
              width: "100%",
            }}
          >
            <h1>Plz Login To See All Posts !!</h1>
            <video
              width="100%"
              muted
              autoPlay
              loop
              style={{ objectFit: "contain" }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </Card>
      )}
    </SimpleGrid>
  );
};

export default Post;
