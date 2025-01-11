import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Register from "./pages/Register"
import Main from "./layouts/Main"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/profile/Index"
import AuthProvider from "./providers/AuthProvider"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", element: <Main />, children: [
        { index: true, element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <AuthProvider><Profile /></AuthProvider> }
      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App