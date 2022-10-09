import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button, NavItem } from "react-bootstrap";
import cookies from "react-cookies";
import personIcon from "../icons/man.png";
import { useContext } from "react";
import { AuthContext } from "./contexts/UserAuth";
import { PostContext } from "./contexts/PostContext";
function NavBarComponent() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { setPostsData } = useContext(PostContext);
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
        {!isAuth && (
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
        {isAuth && (
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
                    setIsAuth(false);
                    cookies.remove("token");
                    cookies.remove("userId");
                    cookies.remove("userName");
                    cookies.remove("email");
                    cookies.remove("role");
                    cookies.remove("capabilities");
                    setPostsData([]);
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
                alt={cookies.load("userName")}
                title={cookies.load("userName")}
                width="50px"
              />
              <b style={{ color: "white", textAlign: "center" }}>
                {cookies.load("userName")}
              </b>
            </div>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBarComponent;
