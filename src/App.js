import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Post from './components/Post';
import React, { useEffect, useContext } from 'react';
import NavBarComponent from './components/NavBarComponent';
import AddPostForm from './components/AddPostForm';
import FooterComponent from './components/FooterComponent';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Signup from '../src/components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './components/Signin';
import { AuthContext } from './components/contexts/UserAuth';
import TestChakra from './components/TestChakra';
function App(props) {

  const { user, checkToken, } = useContext(AuthContext);


  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <NavBarComponent />

        <div
         style={{
          display: "flex", justifyContent: "center",
          alignItems: "center", width: "100%",
           height: "100%", margin: "0",
          flexDirection: "row"
        }}
        >

          <Routes>
            <Route exact path='/signin' element={<Signin />} />

            {user.isAuth ? (
              <Route exact path="/add-post" element={<AddPostForm />}>

              </Route>
            ) : <Route exact path="/add-post" element={<Signin />}></Route>}

            <Route exact path="/" element={<Post />}></Route>

            <Route exact path="/signup" element={<Signup />}></Route>

          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
