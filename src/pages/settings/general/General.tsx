import { ArrowLeftIcon } from "lucide-react";
import React from "react";

const General = () => {
  return (
    <div>
      <div className="px-3 pt-3">
        <div
          onClick={() => window.history.back()}
          className="cursor-pointer inline-flex items-center"
        >
          <ArrowLeftIcon size={32} />
          <span className="ml-2">Back</span>
        </div>
      </div>
      <div className="flex items-center justify-center text-xl font-semibold mt-5">
        General Settings
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col mt-3 w-full p-5 rounded-lg">
          <div className="text-center text-gray-500">
            No general settings at this time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
