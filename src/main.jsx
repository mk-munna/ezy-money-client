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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SendMoney from './Pages/SendMoney/SendMoney.jsx';
import MobileRecharge from './Pages/MobileRecharge/MobileRecharge.jsx';
import CashOut from './Pages/CashOut/CashOut.jsx';

const queryClient = new QueryClient();

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
        path: '/agent-register',
        element: <SignUpAgent />
      },
      {
        path: '/send-money',
        element: <SendMoney/>
      },
      {
        path: '/mobile-recharge',
        element: <MobileRecharge />
      },
      {
        path: '/cash-out',
        element: <CashOut />
      },
    ]
  },
  {
    path: '/register',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
