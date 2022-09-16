import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Post from './components/Post';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBarComponent from './components/NavBarComponent';
import AddPostForm from './components/AddPostForm';
import FooterComponent from './components/FooterComponent';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useAuth0 } from '@auth0/auth0-react';
function App(props) {

  const [postsData, setPostsData] = useState([]);
  const { isAuthenticated } = useAuth0();

  const getPosts = async () => {

    const posts = await axios.get(`${process.env.REACT_APP_SERVER}/post`);
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
        {isAuthenticated &&

          <AddPostForm getPosts={getPosts} />
        }


        <Post posts={postsData} getPosts={getPosts} />

      </div>
      <FooterComponent />

    </>
  );
}

export default App;
