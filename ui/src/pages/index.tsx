import { Page } from "./types"
import Home from "./home/App"
import Matchups from "./matchups/App"
import NotFound from "./not-found/App"
import Redirect from "./redirect/App"

export const pages: Page[] = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "Matchups",
    path: "/matchups/*",
    component: <Matchups />,
  },
  {
    name: "Not Found",
    path: "*",
    component: <NotFound />,
    hiddenFromNav: true,
  },
  {
    name: "Redirect",
    path: "redirect",
    component: <Redirect />,
    hiddenFromNav: true,
  },
]
