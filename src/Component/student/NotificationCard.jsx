import React from "react";
import { FaClock } from "react-icons/fa";

const NotificationCard = () => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex space-x-4">
        <FaClock className="h-6 w-6 text-gray-500" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Schedule learning time
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Learning a little each day adds up. Research shows that students who
            make learning a habit are more likely to reach their goals. Set time
            aside to learn and get reminders using your learning scheduler.
          </p>
          <div className="mt-4">
            <button className="text-white bg-primary hover:bg-primary-600 px-4 py-2 rounded-md mr-2">
              Get started
            </button>
            <button className="text-black bg-transparent hover:bg-gray-100 px-4 py-2 rounded-md">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
