import React, { useState, useEffect } from "react";

const Toast = ({ message, type = "info", duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), duration);
    }
  }, [message, duration]);

  const toastStyle = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded shadow-md text-white ${
        toastStyle[type]
      } ${!isVisible && "hidden"}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;
