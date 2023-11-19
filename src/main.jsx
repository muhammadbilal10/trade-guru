import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


import Navbar from './Component/navbar/navbar'
import Login from './Component/login/login'
import Signup from "./Component/signup/signup";
import Home from "./Component/home/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);