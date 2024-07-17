import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Root from './Root/Root.jsx'
import ErrorPage from './ErrorPage/ErrorPage.jsx'
import Login from './Pages/Login/Login.jsx'
import PrivateRoute from './Private/PrivateRoute.jsx'
import UserDashboard from './Pages/Dashboard/UserDashboard.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import SignUp from './Pages/SIgnUp/SignUp.jsx'
import SignUpAgent from './Pages/SIgnUp/SignUpAgent.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <UserDashboard /> 
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <SignUp />
      },
      {
        path: '/agent-register',
        element: <SignUpAgent />
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
