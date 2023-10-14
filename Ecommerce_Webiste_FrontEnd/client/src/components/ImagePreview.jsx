import React from "react";

const ImagePreview = ({ url, heading }) => {
  return (
    <>
      {url ? (
        <div className="mb-2">
          <h2 className="mb-1 text-gray-300">{heading}</h2>
          <div className="w-full h-[250px] rounded-md overflow-hidden ">
            <img
              src={url}
              alt={heading}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImagePreview;
