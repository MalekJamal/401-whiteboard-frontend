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
import cookies from 'react-cookies';
function App(props) {

  const [postsData, setPostsData] = useState([]);
  const [isLogedin, setIsLogedin] = useState(false);

  const setLogin = (state) => {
    setIsLogedin(state);
  }
  const getPosts = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER}/post`,
        {
          headers: {
            Authorization: `Bearer ${cookies.load("token")}`,
          },
        }).then((res)=>{setPostsData(res.data);})
      
      
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    const token = cookies.load('token');
    if (token) {
      getPosts();
      setIsLogedin(true);
    }
  }, []);

  return (
    <>
      <Router>
        <NavBarComponent isLogedin={isLogedin}
          setLogin={setLogin} />
        <div style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", width: "100%", height: "100%", margin: "0",
          flexDirection: "column"
        }}>

          <Routes>
            <Route exact path='/signin' element={<Signin condition={"not-modal"}
              setLogin={setLogin} isLogedin={isLogedin} getPosts={getPosts}
            />} />

            {isLogedin ? (
              <Route exact path="/add-post" element={<AddPostForm
                posts={postsData} getPosts={getPosts} />}>

              </Route>
            ) : <Route exact path="/add-post" element={<Signin condition={"not-modal"} 
              setLogin={setLogin}
              isLogedin={isLogedin} />}></Route>}

            <Route exact path="/" element={<Post posts={postsData} getPosts={getPosts}
              isLogedin={isLogedin} />}></Route>

            <Route exact path="/signup" element={<Signup />}></Route>


          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
