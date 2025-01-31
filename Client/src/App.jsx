import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Register from "./pages/AuthPage/Register"
import Main from "./layouts/Main"
import Login from "./pages/AuthPage/Login"
import Home from "./pages/HomePage/Home"
import Profile from "./pages/profile/Index"
import AuthProvider from "./providers/AuthProvider"
import Admin from "./pages/admin/Index"
import Details from "./pages/HomePage/Details"

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/", element: <Main />, children: [
        { index: true, element: <AuthProvider><Home /></AuthProvider> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <AuthProvider><Profile /></AuthProvider> },
        { path: "/admin", element: <AuthProvider><Admin /></AuthProvider> },
        { path: "/products/:id", element: <Details /> }
      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App