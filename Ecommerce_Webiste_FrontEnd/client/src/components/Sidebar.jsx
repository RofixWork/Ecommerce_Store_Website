import {
  ListBulletIcon,
  ShoppingBagIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

//sidebar data
const sidebarData = [
  {
    id: 1,
    title: "products",
    link: "/dashboard/products",
    icon: <ListBulletIcon className="h-6 w-6 " />,
  },
  {
    id: 2,
    title: "orders",
    link: "/dashboard/orders",
    icon: <ShoppingBagIcon className="h-6 w-6 " />,
  },
  {
    id: 3,
    title: "customers",
    link: "/dashboard/customers",
    icon: <UsersIcon className="h-6 w-6 " />,
  },
  {
    id: 4,
    title: "categories",
    link: "/dashboard/categories",
    icon: <AdjustmentsHorizontalIcon className="h-6 w-6 " />,
  },
];

const Sidebar = ({ sideLeftValue, closeSdiebar }) => {
  return (
    <aside
      className={`z-10 fixed ${sideLeftValue} sm:left-0 top-0 w-64 h-screen bg-gray-800 overflow-x-hidden transition-all`}
    >
      <div className="bg-white py-2 flex justify-between sm:justify-center px-2 items-center ">
        <BuildingStorefrontIcon className="h-8 -8 text-black2" />
        <XMarkIcon
          onClick={closeSdiebar}
          className="absolute right-2 top-2 h-8 w-8 cursor-pointer block sm:hidden"
        />
      </div>
      <ul className="my-3">
        {sidebarData.map((data) => {
          const { id, title, icon, link } = data;
          return (
            <li key={id}>
              <Link
                to={link}
                className="flex items-center text-white py-4 px-2 gap-2 hover:bg-gray-600 cursor-pointer transition-all"
              >
                {icon}
                <h3 className="text-lg capitalize font-semibold">{title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
