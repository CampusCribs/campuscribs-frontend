import { ArrowLeftIcon } from "lucide-react";
import React from "react";

const Notifications = () => {
  return (
    <div>
      <div className="px-3 pt-3">
        <div onClick={() => window.history.back()}>
          <ArrowLeftIcon size={40} />
        </div>
        <div className="flex items-center justify-center text-xl font-semibold mt-5">
          Notifications
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col mt-3 w-full p-5 rounded-lg">
            <div className="text-center text-gray-500">
              No notification settings at this time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
