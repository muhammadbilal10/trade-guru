import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "alpinejs";
import Positions_page from "./Component/Portfolio/temp";
import Payment from "./Component/payment/payment";
import Home from "./Component/home/home";
import CourseForm from "./Component/course/CourseForm";
import CourseRegistration from "./Component/course/CourseRegistration";
import UploadResource from "./Component/Resources/UploadResource";
import TempLogin from "./Component/login/Templogin";
import Signup from "./Component/signup/signup";
import DashboardHome from "./Component/Dashboard/home";
import Instructorform from "./Component/instructor/instructorfoam";
import Instructorpage from "./Component/Dashboard/instructor/instructorpage";
import Sidebar from "./Component/sidebar/Sidebar";
import AddCourseForm from "./Component/course/AddCourseForm";
import CourseOffer from "./Component/course/CourseOffer";
import Advertisments from "./Component/Dashboard/advertisement/Advertisement";
import FileUpload from "./Component/Resources/ResourceUpload";
import ApproveInstructor from "./Component/Dashboard/instructor/approveInstructor";
import Terminal from "./Component/terminal/terminal";
import Portfolio_Main_Page from "./Component/Portfolio/portfolio_main_page";
import MarketSummaryPage from "./Component/Portfolio/MarketSummary";

import OverviewPage from "./Component/Portfolio/OverviewPage";
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
    element: <Home />,
  },
  
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <TempLogin />,
    // element: <Login/>,
  },


  ///dashboard paths
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },

  //dashboard 
  //instructor related paths
  {
    path: "/approveinstructor",
    element: <ApproveInstructor />,
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
    path: "/instructorform",
    element: <Instructorform />,
  },


  //terminal folder
  {
    path: "/terminal",
    element: <Terminal />,
  },



  //portfolio paths
  {
    path: '/portfolio_main_page',
    element: <Portfolio_Main_Page />,
  },
  {
    path: '/overview_page',
    element: <OverviewPage />,
  },
  {
    path: '/positions_page',
    element: <Positions_page />,
  },
  {
    path: '/MarketSummaryPage',
    element: <MarketSummaryPage />,
  },




  {
    path: '/payment_main_page',
    element: <Payment />,
  }







/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////ZAIN NAZIRS WORK RELATED PATHS/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
