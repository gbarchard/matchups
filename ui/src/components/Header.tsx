import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { type Page } from "../pages/types";

export default function Header(props: { pages: Page[] }) {
  const { pages } = props
  const navigate = useNavigate()

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand
          className="cursor-pointer"
          onClick={() => navigate('/')}>
          Matchups.com
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            {pages.map(p =>
              <Nav.Link
                key={p.path}
                onClick={() => navigate(p.path)}>
                {p.name}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}