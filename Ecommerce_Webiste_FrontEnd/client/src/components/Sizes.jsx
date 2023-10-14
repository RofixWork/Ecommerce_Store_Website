import React from "react";

const Sizes = ({ sizes, handleDeleteSize }) => {
  return (
    <>
      {sizes.length ? (
        <>
          <h4 className="mb-3 text-gray-300">Select Size</h4>
          <div className="flex gap-x-3 flex-wrap">
            {sizes.map((size) => {
              return (
                <div
                  onClick={() => handleDeleteSize(size.id)}
                  key={size.id}
                  className="mb-2 px-3 py-1 border border-white rounded-sm font-semibold uppercase cursor-pointer"
                  id={size.id}
                >
                  {size.name}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Sizes;
