import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Register from "./pages/Register"
import Main from "./layouts/Main"
import Login from "./pages/Login"

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App