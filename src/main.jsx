import { Theme } from '@radix-ui/themes'
import "@radix-ui/themes/styles.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import App from './App.jsx'
import './index.css'
import Auth from './pages/Auth.jsx'
import DeveloperProfile from './pages/DeveloperProfile.jsx'
import Developers from './pages/Developers.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import EditProfile from './pages/EditProfile.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/profile/:id" element={<DeveloperProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
    </Route>
    <Route path='/auth' element={<Auth />} />
    <Route path='*' element={<NotFound />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme accentColor='blue' >
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
)
