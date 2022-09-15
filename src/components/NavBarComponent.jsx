import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComponent() {
  return (
    <>
      <Navbar bg="dark" variant="dark" 
      style={{top:"0", position:"sticky",zIndex:"2"}}>
        <Container>
          <Navbar.Brand href="#All">All Posts</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#Programming">Programming</Nav.Link>
            <Nav.Link href="#Funny">Funny</Nav.Link>
            <Nav.Link href="#Facts">Facts</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>
  );
}

export default NavBarComponent;