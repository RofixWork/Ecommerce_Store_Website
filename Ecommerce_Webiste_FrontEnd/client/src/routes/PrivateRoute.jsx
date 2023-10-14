import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { adminToken } = useSelector((state) => state.auth);
  return adminToken ? <Outlet /> : <Navigate to="/auth/admin-login" />;
};

export default PrivateRoute;
