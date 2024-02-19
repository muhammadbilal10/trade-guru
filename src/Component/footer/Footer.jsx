import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSocialsLink = [
    {
      id: 1,
      link: "#",
      icon: <FaFacebook size={25} />,
    },
    {
      id: 2,
      link: "#",
      icon: <FaTwitter size={25} />,
    },
    {
      id: 3,
      link: "#",
      icon: <FaLinkedin size={25} />,
    },
    {
      id: 4,
      link: "#",
      icon: <FaInstagram size={25} />,
    },
  ];
  return (
    <footer className="mt-20 bg-darkBlue text-white py-12 px-4 bg-[#0c1427]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">TechGuru</h2>
          <p className="mb-4">
            Tech Guru is your gateway to mastering the future. Empowering
            learning through an extensive library of tech courses
          </p>
          <div className="flex space-x-4">
            {footerSocialsLink.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="hover:opacity-80 hover:bg-primary p-2 bg-[#1f2638] rounded-md"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Links</h3>
          <ul>
            {[
              "Home",
              "About Us",
              "Pricing",
              "Courses",
              "Contact Us",
              "Blog",
            ].map((item) => (
              <li key={item} className="mb-2">
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "_")}`}
                  className="hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <ul>
            {[
              "Legal",
              "Terms of Use",
              "Team & Condition",
              "Payment Method",
              "Privacy Policy",
            ].map((item) => (
              <li key={item} className="mb-2">
                <Link
                  to={`/${item
                    .toLowerCase()
                    .replace(/ & /g, "_")
                    .replace(/\s+/g, "")}`}
                  className="hover:underline"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">Join over 68,000 people getting our emails</p>
          <div className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your mail"
              className="w-full px-4 py-2 rounded-md text-black"
            />
            <button className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-300">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 pt-8 mt-8">
        <p>© Copyright 2022 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
