import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Search from "./Search";
const Nav = () => {
  const { cart } = useSelector((state) => state.cart);
  const { userToken, user } = useSelector((state) => state.auth);
  const [toggleSearchBar, setToggleSearchBar] = useState("opacity-0 invisible");
  return (
    <nav className="z-50 px-2 bg-white w-full h-[60px] flex items-center border-b border-b-gray-200 fixed top-0 left-0">
      <div className="max-w-screen-xl px-4 sm:px-0 w-full mx-auto flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl">
          Store
        </Link>
        <ul className="flex items-center gap-x-5">
          <li
            className="cursor-pointer"
            onClick={() => setToggleSearchBar("opacity-100 visible")}
          >
            <BsSearch size={23} />
          </li>
          <li>
            {userToken ? (
              <Link className="font-base text-lg" to={"/user"}>
                {user?.unique_name}
              </Link>
            ) : (
              <Link className="font-base text-lg" to={"/login"}>
                Login
              </Link>
            )}
          </li>
          <li className="relative">
            <Link to={"/cart"}>
              <AiOutlineShoppingCart size={24} />
              <span className="h-5 w-5 grid place-items-center text-sm bg-indigo-600 text-white rounded-full absolute -top-2 -right-2">
                {cart?.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <Search
        toggleSearchBar={toggleSearchBar}
        setToggleSearchBar={setToggleSearchBar}
      />
    </nav>
  );
};

export default Nav;
