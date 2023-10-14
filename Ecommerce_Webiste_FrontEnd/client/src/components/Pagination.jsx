import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pageNumber, count, pageSize, link, admin = true }) => {
  const items = Math.ceil(count / pageSize) || null;
  const btnStyle = admin ? "bg-white text-gray-900" : "bg-gray-900 text-white";
  return (
    <div className="flex justify-center items-center py-5">
      {items &&
        [...Array(items).keys()].map((item) => {
          const numberItem = item + 1;
          return (
            <Link
              key={Math.ceil(Math.random() * 1000)}
              to={`${link}/${numberItem}`}
              className={`${
                pageNumber == numberItem ? btnStyle : "border border-gray-200"
              } w-[40px] h-[40px] grid place-items-center text-lg cursor-pointer `}
            >
              {numberItem}
            </Link>
          );
        })}
    </div>
  );
};

export default Pagination;
