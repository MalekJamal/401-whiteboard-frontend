import { useState, createContext } from "react";
import axios from "axios";
import base64 from "base-64";
import Swal from "sweetalert2";
import cookies from "react-cookies";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flip, setFlip] = useState(false);
  const [role, setRole] = useState('');
  const [user, setUser] = useState({});
  const [capabilities, setCapabilities] = useState('');

  const signUP = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      userName: e.target.userName.value,
      password: e.target.password.value,
    };
    await axios
      .post(`${process.env.REACT_APP_SERVER}/signup`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Welcome " + res.data.userName,
          text: "Please Login!!",
          footer: "After login, you can share your posts with others!!",
          confirmButtonColor: "black",
        });
        setFlip(true);
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Email Or Username Already Eixist!",
          text: "Please try with correct info!!",
          confirmButtonColor: "black",
        })
      );
  };


  const signIn = async (e) => {
    e.preventDefault();
    const data={
        password: e.target.password.value,
        email: e.target.email.value
    }
    const encoded = base64.encode(`${data.email}:${data.password}`);

    await axios
      .post(
        `${process.env.REACT_APP_SERVER}/signin`,
        {},
        {
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      )
      .then((res) => {
        setIsAuth(true);
        cookies.save("token", res.data.token);
        cookies.save("userId", res.data.id);
        cookies.save("userName", res.data.userName);
        cookies.save("email", res.data.email);
        cookies.save("role", res.data.role);
        cookies.save("capabilities", res.data.capabilities);
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Enter correct Info!",
          text: "Please try with correct info!!",
          confirmButtonColor: "black",
        });
      });
  };

  const getUserInfo = async(id)=>{
    setUser('');
  }

  const checkToken = ()=>{
    const token = cookies.load('token');
    if (token) {
        setRole(cookies.load('role'));
        setCapabilities(cookies.load('capabilities'));
        setIsAuth(true);
        getUserInfo();
    }
  }

  const value = { 
    signIn, isAuth, 
    setIsAuth, flip, confirmPassword, setConfirmPassword, 
    signUP, checkToken, role, capabilities, user
 };

  return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
