import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "alpinejs";

import Navbar from "./Component/navbar/navbar";
import Login from "./Component/login/login";
import Signup from "./Component/signup/signup";
import Home from "./Component/home/home";
import CourseForm from "./Component/course/CourseForm";
import CourseRegistration from "./Component/course/CourseRegistration";
import UploadResource from "./Component/Resources/UploadResource";
import TempLogin from "./Component/login/Templogin";
import TempSignup from "./Component/signup/Tempsignup";
import DashboardHome from "./Component/Dashboard/home";
import Instructorform from "./Component/instructor/instructorfoam";
import Instructorpage from "./Component/Dashboard/instructor/instructorpage";
import Sidebar from "./Component/sidebar/Sidebar";
import AddCourseForm from "./Component/course/AddCourseForm";
import CourseOffer from "./Component/course/CourseOffer";
import FileUpload from "./Component/Resources/ResourceUpload";

const CourseRoutes = () => {
  return (
    <div className="bg-[#eaeef3] min-h-screen flex">
      <div className="flex-1 ml-72">
        <Routes> 
          <Route path="/add" element={<AddCourseForm />} />
          <Route path="/offer" element={<CourseOffer />} />
          <Route path="/uploadResources" element={<FileUpload />} />
          {/* Add other main routes here */}
        </Routes>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    // element: <DashboardHome/>
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },
  {
    path: "/signup",
    element: <TempSignup />,
    // element: <Signup/>,
  },
  {
    path: "/instructorpage",
    element: <Instructorpage />,
  },
  {
    path: "/login",
    element: <TempLogin />,
    // element: <Login/>,
  },
  {
    path: "/course/*",
    // element: <CourseForm/>,
    element: (
      <>
        <Sidebar />
        <CourseRoutes />
      </>
    ),
  },

  {
    path: "/Regesteration",
    element: <CourseRegistration />,
  },
  {
    path: "/instructoform",
    element: <Instructorform />,
    // element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
