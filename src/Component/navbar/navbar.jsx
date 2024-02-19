import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Courses", to: "/course" },
    { title: "Registration", to: "/registration" },
    { title: "Dashboard", to: "/dashboard" },
    { title: "Payment", to: "/payment_main_page" },
    { title: "Stocks", to: "/terminal" },
    { title: "Portfolio", to: "/portfolio_main_page" },
  ];

  const navButtons = [
    { title: "Login", to: "/login" },
    { title: "Signup", to: "/signup" },
    { title: "Instructor", to: "/instructorform" },
  ];

  return (
    <nav className="bg-white text-black shadow-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center font-bold">
                <span className="text-xl">Trade</span>
                <span className="text-xl text-primary">Guru.pk</span>
              </a>
            </div>
          </div>
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Heroicon name: outline/menu */}
              {/* Icon when menu is open. */}
              {/* Heroicon name: outline/x */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex sm:items-center sm:space-x-6">
            {navLinks.map((link, index) => (
              <Link to={link.to} key={index}>
                <button className="hover:text-white hover:bg-primary px-4 py-1 rounded-md transition duration-300">
                  {link.title}
                </button>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex sm:items-center sm:space-x-4">
            {navButtons.map((button, index) => (
              <Link to={button.to} key={index}>
                <button className="border rounded-md px-4 w-full py-2 bg-primary hover:bg-primary-100 text-white">
                  {button.title}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`${isOpen ? "block" : "hidden"} lg:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link, index) => (
            <Link
              to={link.to}
              key={index}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-primary"
            >
              {link.title}
            </Link>
          ))}
          {navButtons.map((button, index) => (
            <Link
              to={button.to}
              key={index}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-primary"
            >
              {button.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
