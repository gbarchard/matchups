import Header from './components/Header'
import Home from './pages/home/App'
import Matchups from './pages/matchups/App'
import { type Page } from './pages/types';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const pages: Page[] = [
  {
    name: "Home",
    path: "/home",
    component: <Home />
  },
  {
    name: "Matchups",
    path: "/matchups",
    component: <Matchups />
  }
]

export default function App() {
  return (
    <BrowserRouter>
      <Header pages={pages} />
      <Routes>
        <Route path="/" element={<Home />} />
        {pages.map(p =>
          <Route key={p.path} path={p.path} element={p.component} />
        )}
      </Routes>
    </BrowserRouter>
  )
}
