import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button, NavItem } from "react-bootstrap";


function NavBarComponent(props) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ marginLeft: "18px" }}>White Board</Navbar.Brand>
        {/* {! props.isLogedin &&

        <NavItem>
          <Link
            to="/signup"
            className="nav-link"
            style={{ color: "white", margin: "5px 20px" }}
          >
            Sign Up
          </Link>
        </NavItem>
        } */}

        <NavItem>
          <Link
            to="/"
            className="nav-link"
            style={{ color: "white", margin: "5px 20px" }}
          >
            Home
          </Link>
        </NavItem>
        {!false && (
          <NavItem>
            <Link
              to="/add-post"
              className="nav-link"
              style={{ color: "white", margin: "5px 20px" }}
            >
              Add Post
            </Link>
          </NavItem>
        )}
        {!props.isLogedin && 
          <NavItem>
            <Link
              to="/signin"
              className="nav-link"
              style={{
                color: "white",
                margin: "5px 20px",
                float: "right",
                marginLeft: "auto",
              }}
            >
              <Button variant="light" >Sign In</Button>
            </Link>
          </NavItem>}
              {props.isLogedin &&

         <NavItem>
          <Link
            to="/"
            className="nav-link"
            style={{
              color: "white",
              margin: "5px 20px",
              float: "right",
              marginLeft: "auto",
            }}
          >
            <Button variant="light" onClick={()=>
              props.setLogin(false)
            }
              >Log out</Button>
          </Link>
        </NavItem>
              }
        {/* <Signin show={show} handleClose={handleClose}/> */}
      </Navbar>
    </>
  );
}

export default NavBarComponent;
