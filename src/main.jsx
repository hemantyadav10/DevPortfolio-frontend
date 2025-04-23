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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from './context/authContext'
import PublicRoute from './pages/PublicRoute.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Overview from './pages/Overview.jsx'
import Skills from './pages/Skills.jsx'
import Endorsements from './pages/Endorsements.jsx'
import Settings from './pages/Settings.jsx'
import ThemeSetting from './pages/ThemeSetting.jsx'
import AccountSettings from './pages/AccountSettings.jsx'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import SocketProvider from './context/socketContext'
import OverviewTab from './components/OverviewTab.jsx'
import SkillsTab from './components/SkillsTab.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/profile/:userId" element={<DeveloperProfile />} >
        <Route index element={<OverviewTab />} />
        <Route path='overview' element={<OverviewTab />} />
        <Route path='skills' element={<SkillsTab />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/settings' element={<Settings />}>
          <Route index element={<EditProfile />} />
          <Route path='profile' element={<EditProfile />} />
          <Route path='theme' element={<ThemeSetting />} />
          <Route path='account' element={<AccountSettings />} />
        </Route>
        <Route path='dashboard' element={<Dashboard />} >
          <Route index element={<Overview />} />
          <Route path='skills' element={<Skills />} />
          <Route path='endorsements' element={<Endorsements />} />
        </Route>
      </Route>
    </Route>
    <Route element={<PublicRoute />}>
      <Route path='/auth' element={<Auth />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>
))

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 2 * 1000,
      retry: 2
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <ThemeProvider
            attribute={'class'}
            disableTransitionOnChange
            defaultTheme='light'
          >
            <Theme accentColor='blue' >
              <RouterProvider router={router} />
              <Toaster richColors />
              <ReactQueryDevtools initialIsOpen={true} />
            </Theme>
          </ThemeProvider>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
