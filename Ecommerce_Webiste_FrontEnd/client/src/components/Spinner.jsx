import React from "react";
import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center h-[300px] items-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={["#ffc300", "#ffc300", "#ffc300", "#ffc300", "#ffc300"]}
      />
    </div>
  );
};

export default Spinner;
