import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import base64 from "base-64";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        props.setLogin(true, res.data.email, res.data.userName);
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Enter correct Info!",
          text: "Please try with correct info!!",
          confirmButtonColor: "black",
        })
      );
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={signIn}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              padding: "15px",
              height: "100%",
              marginTop: "16px",
              marginBottom: "16px",
              flexDirection: "column",
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={props.handleClose}>
              Sign In
            </Button>
          </Form>
          <p style={{ marginTop: "10px", padding: "6px" }}>
            Don't Have an Account?{" "}
            <span
              style={{ cursor: "pointer", padding: "6px" }}
              onClick={() => console.log("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
