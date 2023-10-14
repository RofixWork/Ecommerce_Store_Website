import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";

const Wrapper = ({ children }) => {
  const [side, setSide] = useState("-left-64");

  function openSdiebar() {
    setSide("left-0");
  }

  function closeSdiebar() {
    setSide("-left-64");
  }

  return (
    <>
      <Sidebar closeSdiebar={closeSdiebar} sideLeftValue={side} />
      <AdminNav openSidebar={openSdiebar} />
      <section className="sm:ml-64 pt-[80px] px-2 bg-gray-900 min-h-screen text-white">
        <div className="bg-gray-800 py-3 px-4 mt-3">{children}</div>
      </section>
    </>
  );
};

export default Wrapper;
