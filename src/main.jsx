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
import CourseForm from "./Component/course/CourseForm";
import CourseRegistration from "./Component/course/CourseRegistration";
import UploadResource from "./Component/Resources/UploadResource";

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
  {
    path: "/course",
    element: <CourseForm/>,
  },
  
  {
    path: "/Regesteration",
    element: <CourseRegistration/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);