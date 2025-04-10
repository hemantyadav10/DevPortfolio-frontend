import { Outlet, ScrollRestoration } from "react-router"
import Header from "./components/Header"

function App() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet />
    </>
  )
}

export default App
