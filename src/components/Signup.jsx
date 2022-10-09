import React, { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/UserAuth";

const LoginButton = (props) => {
  const [password, setPassword] = useState('');
  const { signUP, flip,
     confirmPassword, setConfirmPassword} = useContext(AuthContext);
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
            name='userName'
            placeholder="Joe Doe"
            
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name='email'
            required
            placeholder="example@example.com"
           
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name='password'
            required
           onChange={(e)=>setPassword(e.target.value)}
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
