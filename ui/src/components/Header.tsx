import { Navbar } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import { type Page } from "../pages/types"
import UserLogin from "./UserLogin"

export default function Header(props: { pages: Page[] }) {
  const { pages } = props
  const navigate = useNavigate()

  return (
    <Navbar fluid>
      <Navbar.Brand
        className="cursor-pointer py-2 dark:text-gray-400 dark:hover:text-white"
        onClick={() => navigate("/")}
      >
        Matchups.com
      </Navbar.Brand>
      <div className="flex md:order-2 gap-4">
        <UserLogin />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {pages
          .filter((p) => !p.hiddenFromNav)
          .map((p) => (
            <Navbar.Link href={p.path.replace("*", "")} key={p.path}>
              {p.name}
            </Navbar.Link>
          ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
