import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import base64 from "base-64";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import cookies from "react-cookies";

const Signin = (props) => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    const encoded = base64.encode(`${email}:${password}`);

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
        props.setLogin(true);
        //props.getPosts();
        cookies.save("token", res.data.token);
        cookies.save("userId", res.data.id);
        cookies.save("userName", res.data.userName);
        cookies.save("email", res.data.email);        
        cookies.save("role", res.data.role);        
      })
      .catch((e) =>{
        console.log(e)
        Swal.fire({
          icon: "error",
          title: "Enter correct Info!",
          text: "Please try with correct info!!",
          confirmButtonColor: "black",
        })}
      );
  };

  return (
    <>
      {props.condition === "not-modal" && (
        <>
          <Form
            onSubmit={signIn}
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "center",
              alignContent: "center",
              padding: "15px",
              height: "100%",
              marginTop: "30px",
              marginBottom: "16px",
              flexDirection: "column",
              boxShadow: "10px 10px 10px 10px #8888",
              borderRadius: "10px",
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="example@example.com"
                onChange={(e) => setEamil(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={props.handleClose}>
              Sign In
            </Button>
          </Form>
          <p style={{ marginTop: "10px", padding: "6px" }}>
            Don't Have an Account?{" "}
            <Link to="/signup">
              <span
                style={{ cursor: "pointer", padding: "4px", color: "black" }}
              >
                Sign Up
              </span>
            </Link>
          </p>
          {props.isLogedin && <Navigate to="/" />}
        </>
      )}
    </>
  );
};

export default Signin;
