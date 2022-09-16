import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Login from "./Login";
import Logout from "./Logout";

function NavBarComponent() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ top: "0", position: "sticky", zIndex: "2" }}
      >
        <Container>
          <Navbar.Brand href="#">White Board</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Login />
          <Logout />
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarComponent;
