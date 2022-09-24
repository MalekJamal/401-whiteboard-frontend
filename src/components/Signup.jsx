import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
const LoginButton = (props) => {
  const [email, setEamil] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flip, setFlip] = useState(false);

  const signUP = async (e) => {
    e.preventDefault();
    const data = {
      email,
      userName,
      password,
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

  return (
    <>
      <Form
        onSubmit={signUP}
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "center",
          alignContent: "center",
          padding: "15px",
          height: "100%",
          marginTop: "20px",
          marginBottom: "20px",
          flexDirection: "column",
          boxShadow: "10px 10px 10px 10px #8888",
          borderRadius: "10px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Joe Doe"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
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
            type="text"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <p>
          {password === confirmPassword && password !== "" ? (
            <span>
              <b style={{ color: "greenyellow" }}>✔</b> Match
            </span>
          ) : (
            "❌Password dosn't Match"
          )}
        </p>
        {password === confirmPassword ? (
          <Button variant="dark" type="submit">
            Sign Up
          </Button>
        ) : (
          <Button variant="dark" disabled type="submit">
            Sign Up
          </Button>
        )}
      </Form>
      <p style={{ marginTop: "10px", padding: "6px" }}>
        Already Have an Account?{" "}
        <Link to="/signin">
          <span style={{ cursor: "pointer", padding: "4px", color: "black" }}>
            Sign In
          </span>
        </Link>
      </p>
      {flip && <Navigate to="/signin" />}
    </>
  );
};

export default LoginButton;
