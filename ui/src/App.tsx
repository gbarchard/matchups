import { Auth0Provider } from "@auth0/auth0-react"
import { Breadcrumb } from "flowbite-react"
import { PropsWithChildren, useMemo } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AppContextProvider, useAppConfigState } from "./components/AppContext"
import Header from "./components/Header"
import { pages } from "./pages"

export default function App() {
  return (
    <GlobalProviders>
      <div className="flex flex-col h-full">
        <Header pages={pages} />
        <div className="dark:bg-gray-900 flex-1 overflow-scroll px-2 sm:px-4">
          <Breadcrumbs className="my-2" />
          <Routes>
            {pages.map((p) => (
              <Route key={p.path} path={p.path} element={p.component} />
            ))}
          </Routes>
        </div>
      </div>
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

function Breadcrumbs(props: { className?: string }) {
  const { className } = props
  const location = useLocation()
  const breadcrumbs = useMemo(
    () => location.pathname.split("/").filter((b) => b !== ""),
    [location]
  )

  return (
    <Breadcrumb className={className}>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {breadcrumbs.map((b, i) => (
        <Breadcrumb.Item
          key={`breadcrumb-item-${i}`}
          href={`/${breadcrumbs.slice(0, i + 1).join("/")}`}
        >
          {title(b.replace("-", " "))}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

/** Capitalizes the first letter of every word */
function title(s: string) {
  return s.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
}
