import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice";

const AdminNav = ({ openSidebar }) => {
  const dispatch = useDispatch();
  //logout
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <nav className="fixed left-0 sm:left-64 right-0 top-0 p-2">
      <div className="bg-gray-800 p-3 flex justify-between sm:justify-end items-center">
        <Bars3BottomRightIcon
          onClick={openSidebar}
          className="text-white h-8 w-8 block sm:hidden"
        />
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white px-4 py-2 text-lg font-semibold cursor-pointer rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
