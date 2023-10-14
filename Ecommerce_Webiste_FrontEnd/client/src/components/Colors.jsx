import React from "react";

const Colors = ({ colors, handleDeleteColor }) => {
  return (
    <div>
      {colors?.length ? (
        <>
          <h1 className="text-gray-300 mb-3">Colors List</h1>
          <div className="flex gap-x-2 gap-y-1 items-center flex-wrap">
            {colors?.map(({ id, color }) => {
              return (
                <div
                  onClick={() => handleDeleteColor(id)}
                  style={{ backgroundColor: color }}
                  key={id}
                  className="h-[40px] w-[40px] rounded-full cursor-pointer"
                ></div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Colors;
