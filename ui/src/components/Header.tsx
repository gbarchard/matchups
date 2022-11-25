import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import { type Page } from "../pages/types"
import UserLogin from "./UserLogin"

export default function Header(props: { pages: Page[] }) {
  const { pages } = props
  const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="cursor-pointer" onClick={() => navigate("/")}>
          Matchups.com
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav" />
        <Navbar.Collapse id="header-nav">
          <Nav className="container-fluid">
            {pages
              .filter((p) => !p.hiddenFromNav)
              .map((p) => (
                <Nav.Link key={p.path} onClick={() => navigate(p.path)}>
                  {p.name}
                </Nav.Link>
              ))}
            <Nav.Item className="lg:ml-auto">
              <UserLogin />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
