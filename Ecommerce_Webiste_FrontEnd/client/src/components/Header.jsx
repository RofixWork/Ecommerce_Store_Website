import React from "react";

const Header = ({ children }) => {
  return (
    <header
      className={`h-[500px] flex items-center bg-[url(https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-no-repeat bg-bottom bg-blend-overlay bg-gray-600 text-white`}
    >
      <div className="container">
        <h2 className="capitalize text-xl sm:text-4xl font-bold">{children}</h2>
      </div>
    </header>
  );
};

export default Header;
