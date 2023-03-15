import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const App = () => {
  return (
    <div className="main">
      <HashRouter>
        <RouterProvider router={router} />
      </HashRouter>

    </div>
  );
};

export default App;

