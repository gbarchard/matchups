import Container from "react-bootstrap/Container"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useFetch } from "usehooks-ts"
import Header from "./components/Header"
import Home from "./pages/home/App"
import Matchups from "./pages/matchups/App"
import NotFound from "./pages/not-found/App"
import { type Page } from "./pages/types"

const pages: Page[] = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "Matchups",
    path: "/matchups",
    component: <Matchups />,
  },
  {
    name: "Not Found",
    path: "*",
    component: <NotFound />,
    hiddenFromNav: true,
  },
]

export default function App() {
  const { data } = useFetch<string>("http://localhost:9000/got-here")

  return (
    <BrowserRouter>
      <Header pages={pages} />
      <div>{data}</div>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          {pages.map((p) => (
            <Route key={p.path} path={p.path} element={p.component} />
          ))}
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
