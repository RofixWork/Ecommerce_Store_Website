import React from "react";
import { NavLink } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { userLogout } from "../../app/slices/authSlice";

const AccountList = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div className="container mt-10">
      <div className="grid grid-cols-1 gap-y-4 sm:gap-y-0 md:grid-cols-3 md:gap-x-2">
        <div className="account_links">
          <NavLink className="account_link" to="/user">
            <MdAccountCircle size={24} />
            <span>My Account</span>
          </NavLink>
          <NavLink className="account_link" to="/user-orders">
            <AiOutlineShoppingCart size={24} />
            <span>Orders</span>
          </NavLink>
          <span
            className="account_link cursor-pointer"
            onClick={() => dispatch(userLogout())}
          >
            <IoMdLogOut size={24} />
            <span>Logout</span>
          </span>
        </div>
        <div className="col-span-2 px-3">{children}</div>
      </div>
    </div>
  );
};

export default AccountList;
