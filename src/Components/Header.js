import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  const navData = [
    { name: "Movies", link: "/Movies" },
    { name: "TV Series", link: "/TVSeries" },
    { name: "Search", link: "/Search" },
  ];
  return (
    <header className="header">
      <Navbar bg="dark" expand="sm">
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                fontSize: "1em",
                textDecoration: "none",
                color: "white",
              }}
            >
              CineVerse
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {navData.map((item) => {
                return (
                  <Nav key={item.name}>
                    <Link to={item.link}>{item.name}</Link>
                  </Nav>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
