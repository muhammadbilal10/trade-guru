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
import TempLogin from "./Component/login/Templogin";
import TempSignup from "./Component/signup/Tempsignup";
import DashboardHome from "./Component/Dashboard/home";
import Instructorform from "./Component/instructor/instructorfoam";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <DashboardHome/>
     element: <Home/>,
  },
  {
    path: "/dashboard",
    element: <DashboardHome/>,
  },
  {
    path: "/signup",
    element:<TempSignup/>
    // element: <Signup/>,
  },
  {
    path: "/login",
    element:<TempLogin/>
    // element: <Login/>,
  },
  {
    path: "/course",
    element: <CourseForm/>,
  },
  
  {
    path: "/Regesteration",
    element: <CourseRegistration/>,
  },
  {
    path: "/instructoform",
    element:<Instructorform/>
    // element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);