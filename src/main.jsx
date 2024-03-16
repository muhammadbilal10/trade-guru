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

import Advertisement from "./Component/Dashboard/advertisement/Advertisement";
import FileUpload from "./Component/Resources/ResourceUpload";
import ApproveInstructor from "./Component/Dashboard/instructor/approveInstructor";
import Terminal from "./Component/terminal/terminal";
import Portfolio_Main_Page from "./Component/Portfolio/portfolio_main_page";
import MarketSummaryPage from "./Component/Portfolio/MarketSummary";
import Student from "./Component/Dashboard/student/managestudent";
import OverviewPage from "./Component/Portfolio/OverviewPage";

///////////zains///////////////////
import NewCourseCard from "./Component/course/NewCourseCard";
import OfferCourseCard from "./Component/course/OfferCourseCard";
import Navbar from "./Component/navbar/navbar";
import Footer from "./Component/footer/Footer";
import Hero from "./Component/home/Hero";
import CourseDetails from "./Component/course/CourseDetails";
import MyCourses from "./Component/student/MyCourses";
import CurriculumSection from "./Component/Dashboard/InstructorDashboard/Course/CurriculumSection";
import AddCoursePage from "./Component/Dashboard/InstructorDashboard/Course/AddCoursePage";
import CoursePage from "./Component/Dashboard/InstructorDashboard/Course/CoursePage";
import Feedback from "./Component/Dashboard/InstructorDashboard/Course/Feedback";

import Checkout from "./Component/payment/Checkout";
const CourseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CourseOffer />} />
      <Route path="/course-details/:id" element={<CourseDetails />} />
      {/* <Route path="/offer" element={<CourseOffer />} />
      <Route path="/uploadResources" element={<FileUpload />} /> */}
    </Routes>
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
  //advertisment related path
  {
    path: "/advertisement",
    element: <Advertisement />,
  },
  {
    path: "/login",
    element: <TempLogin />,
    // element: <Login/>,
  },

  //dashboard
  //Student related paths
  {
    path: "/student_page",
    element: <Student />,
  },

  // {
  //   path: "/course/*",
  //   // element: <CourseForm/>,
  //   element: (
  //     <>
  //       <Sidebar />
  //       <CourseRoutes />
  //     </>
  //   ),
  // },

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
    path: "/portfolio_main_page",
    element: <Portfolio_Main_Page />,
  },
  {
    path: "/overview_page",
    element: <OverviewPage />,
  },
  {
    path: "/positions_page",
    element: <Positions_page />,
  },
  {
    path: "/MarketSummaryPage",
    element: <MarketSummaryPage />,
  },

  {
    path: "/payment_main_page",
    element: <Payment />,
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////ZAIN NAZIRS WORK RELATED PATHS/////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    path: "/course/*",
    // element: <CourseForm/>,
    element: (
      <>
        {/* <Sidebar /> */}
        <Navbar />
        <Hero />
        <CourseRoutes />
        <Footer />
      </>
    ),
  },
  {
    path: "/my-courses",
    element: (
      <>
        <Navbar />
        <Hero />
        <MyCourses />
        <Footer />
      </>
    ),
  },

  {
    path: "/coursePage",
    element: <AddCoursePage />,
  },
  {
    path: "/feedback/:id",
    element: <Feedback />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <Elements stripe={stripePromise} options={options}></Elements> */}
    <RouterProvider router={router} />
  </>
);
