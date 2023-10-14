import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { adminToken } = useSelector((state) => state.auth);
  return adminToken ? <Navigate to="/dashboard/products" /> : <Outlet />;
};

export default PublicRoute;
