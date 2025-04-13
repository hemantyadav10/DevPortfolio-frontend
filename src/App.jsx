import { Outlet, ScrollRestoration } from "react-router"
import Header from "./components/Header"
import SessionExpiredModal from "./components/SessionExpiredModal"
import { useAuth } from "./context/authContext"

function App() {
  const { showSessionExpiredModal } = useAuth()

  return (
    <>
      <ScrollRestoration />
      {showSessionExpiredModal && <SessionExpiredModal />}
      <Header />
      <Outlet />
    </>
  )
}

export default App
