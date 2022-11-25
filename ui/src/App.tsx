import { Auth0Provider } from "@auth0/auth0-react"
import { PropsWithChildren } from "react"
import Container from "react-bootstrap/Container"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppContextProvider, useAppConfigState } from "./components/AppContext"
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
  return (
    <GlobalProviders>
      <Header pages={pages} />
      <Container>
        <Routes>
          {pages.map((p) => (
            <Route key={p.path} path={p.path} element={p.component} />
          ))}
        </Routes>
      </Container>
    </GlobalProviders>
  )
}

function GlobalProviders(props: PropsWithChildren) {
  const appState = useAppConfigState()

  if (!process.env.REACT_APP_AUTH_DOMAIN) {
    throw new Error("Missing REACT_APP_AUTH_DOMAIN")
  }

  if (!process.env.REACT_APP_AUTH_CLIENT_ID) {
    throw new Error("Missing REACT_APP_AUTH_CLIENT_ID")
  }

  return (
    <AppContextProvider state={appState}>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH_DOMAIN}
          clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
          audience={`https://${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`}
        >
          {props.children}
        </Auth0Provider>
      </BrowserRouter>
    </AppContextProvider>
  )
}
