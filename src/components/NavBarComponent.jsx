import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button, NavItem } from "react-bootstrap";
import cookies from "react-cookies";
import personIcon from "../icons/man.png";
import { useContext } from "react";
import { AuthContext } from "./contexts/UserAuth";
function NavBarComponent() {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ marginLeft: "18px" }}>White Board</Navbar.Brand>

        <NavItem>
          <Link
            to="/"
            className="nav-link"
            style={{ color: "white", margin: "5px 20px" }}
          >
            Home
          </Link>
        </NavItem>
        {
          <NavItem>
            <Link
              to="/add-post"
              className="nav-link"
              style={{ color: "white", margin: "5px 20px" }}
            >
              Add Post
            </Link>
          </NavItem>
        }
        {!user.isAuth && (
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
              <Button variant="light">Sign In</Button>
            </Link>
          </NavItem>
        )}
        {user.isAuth && (
          <>
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
                <Button
                  variant="light"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </Button>
              </Link>
            </NavItem>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <img
                src={personIcon}
                alt={JSON.parse(localStorage.getItem("userName"))}
                title={JSON.parse(localStorage.getItem("userName"))}
                width="50px"
              />
              <b style={{ color: "white", textAlign: "center" }}>
                {JSON.parse(localStorage.getItem('userName'))}
              </b>
            </div>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBarComponent;
