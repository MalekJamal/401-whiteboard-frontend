import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Post from './components/Post';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBarComponent from './components/NavBarComponent';
import AddPostForm from './components/AddPostForm';
import FooterComponent from './components/FooterComponent';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
function App(props) {

  const [postsData, setPostsData] = useState([]);
  const getPosts = async () => {

    const posts = await axios.get('http://localhost:4000/post');
    setPostsData(posts.data);

  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <NavBarComponent />
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", width: "100%", height: "100%", margin: "0",
        flexDirection: "column"
      }}>
        <AddPostForm getPosts={getPosts} />

        <Post posts={postsData} getPosts={getPosts} />

      </div>
      <FooterComponent />
    </>
  );
}

export default App;
