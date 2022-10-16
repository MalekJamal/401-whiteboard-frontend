import { Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/UserAuth";
const Signin = (props) => {
  
  const { signIn, user } = useContext(AuthContext);

  return (
    
      
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
                name='email'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                autoComplete="on"
                
              />
            </Form.Group>
            <Button variant="dark" type="submit">
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
          {user.isAuth && <Navigate to="/" />}
        </>
  );
};

export default Signin;
