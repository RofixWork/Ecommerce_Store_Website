import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import Products from "../screens/Dashboard/Products";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Categories from "../screens/Dashboard/Categories";
import AddCategory from "../screens/Dashboard/AddCategory";
import UpdateCategory from "../screens/Dashboard/UpdateCategory";
import CreateProduct from "../screens/Dashboard/CreateProduct";
import EditProduct from "../screens/Dashboard/EditProduct";
import HomePage from "../screens/home/HomePage";
import Login from "../screens/home/auth/Login";
import Register from "../screens/home/auth/Register";
import Dashboard from "../screens/user/Dashboard";
import UserRoute from "./UserRoute";
import UserAuthRoute from "./UserAuthRoute";
import CatProducts from "../screens/home/CatProducts";
import Product from "../screens/home/Product";
import SearchProducts from "../screens/home/SearchProducts";
import Cart from "../screens/home/Cart";
import Orders from "../screens/Dashboard/Orders";
import OrderDetails from "../screens/Dashboard/OrderDetails";
import UserOrders from "../screens/home/UserOrders";
import UserOrderDetails from "../screens/home/UserOrderDetails";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cat-products/:categoryName/:pageNumber?"
          element={<CatProducts />}
        />
        <Route
          path="/search-products/:keyword/:pageNumber?"
          element={<SearchProducts />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        {/* user auth */}
        <Route path="/" element={<UserAuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* user route */}
        <Route path="/" element={<UserRoute />}>
          <Route path="/user" element={<Dashboard />} />
          <Route path="/user-orders/:pageNumber?" element={<UserOrders />} />
          <Route
            path="/user-order-details/:id"
            element={<UserOrderDetails />}
          />
        </Route>
        {/* auth admin */}
        <Route path="auth" element={<PublicRoute />}>
          <Route path="admin-login" element={<AdminLogin />} />
        </Route>
        {/* dashboard */}
        <Route path="dashboard" element={<PrivateRoute />}>
          <Route path="categories/:pageNumber?" element={<Categories />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="update-category/:id" element={<UpdateCategory />} />
          <Route path="products/:pageNumber?" element={<Products />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="orders/:pageNumber?" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Route>
        <Route
          path="/*"
          element={<h1 className="text-4xl text-center">Not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
