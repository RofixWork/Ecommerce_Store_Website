import React from "react";
import { Link } from "react-router-dom";

const ScreenHeader = ({ title, link, icon }) => {
  return (
    <div className="my-4 pb-4 border-b border-b-gray-600">
      <Link
        className=" bg-gray-900 capitalize text-white px-4 py-3 font-semibold rounded cursor-pointer inline-block text-lg"
        to={link}
      >
        <div className="flex items-center gap-x-[6px]">
          {icon}
          {title}
        </div>
      </Link>
    </div>
  );
};

export default ScreenHeader;
