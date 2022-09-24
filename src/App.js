import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Post from './components/Post';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBarComponent from './components/NavBarComponent';
import AddPostForm from './components/AddPostForm';
import FooterComponent from './components/FooterComponent';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Signup from '../src/components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './components/Signin';
function App(props) {

  const [postsData, setPostsData] = useState([]);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [logedinEmail, setLogedinEmail] = useState('');
  const [isLogedin, setIsLogedin] = useState(false);
  const [userName, setUserName] = useState('');

  const setLogin = (state, email, userName) => {
    setIsLogedin(state);
    setLogedinEmail(email);
    setUserName(userName);
  }
  const getPosts = async () => {
    const posts = await axios.get(`${process.env.REACT_APP_SERVER}/post`);
    setPostsData(posts.data);

  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <Router>
        <NavBarComponent show={show} handleClose={handleClose} isLogedin={isLogedin} setLogin={setLogin} />
        <div style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", width: "100%", height: "100%", margin: "0",
          flexDirection: "column"
        }}>

          <Routes>
            <Route exact path='/signin' element={<Signin condition={"not-modal"}
              setLogin={setLogin} isLogedin={isLogedin}
            />} />

            {isLogedin ? (
              <Route exact path="/add-post" element={<AddPostForm
                posts={postsData} getPosts={getPosts} email={logedinEmail} userName={userName} />}>

              </Route>
            ) : <Route exact path="/add-post" element={<Signin condition={"not-modal"} setLogin={setLogin}
              isLogedin={isLogedin} />}></Route>}

            <Route exact path="/" element={<Post posts={postsData} getPosts={getPosts}
              isLogedin={isLogedin} logedinEmail={logedinEmail} userName={userName} />}></Route>

            <Route exact path="/signup" element={<Signup />}></Route>


          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
