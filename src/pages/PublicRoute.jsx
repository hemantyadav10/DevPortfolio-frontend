import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/authContext'

function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}

export default PublicRoute;