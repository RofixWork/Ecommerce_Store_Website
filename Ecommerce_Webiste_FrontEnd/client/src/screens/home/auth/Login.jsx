import React, { useEffect, useState } from "react";
import Nav from "../../../components/home/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuthLoginMutation } from "../../../api/authAPI";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../app/slices/authSlice";
import useForm from "../../../hooks/Form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //mutation
  const [authLogin, { isLoading, isError, data, error, isSuccess }] =
    useAuthLoginMutation();
  const getAllErrors = error?.data?.errors || [];
  const { state, onChange } = useForm({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    authLogin(state);
  };

  useEffect(() => {
    if (getAllErrors?.length) {
      getAllErrors?.forEach((error) => toast.error(error));
    }
  }, [isError]);
  //sucess
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user-token", data?.token);
      dispatch(setUserToken(data?.token));
      navigate("/user");
    }
  }, [isSuccess]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Nav />
      <div className="px-2 sm:px-0 min-h-screen w-full flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="auth_form">
          <h2 className="uppercase text-xl font-bold mb-3 text-gray-800">
            sign in
          </h2>
          <div className="mb-3">
            <label htmlFor="email" className="mb-2 block font-semibold text-lg">
              Email
            </label>
            <input
              className="auth_form-input"
              type="text"
              id="email"
              name="email"
              value={state.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-lg"
            >
              Password
            </label>
            <input
              className="auth_form-input"
              type="password"
              id="password"
              autoComplete="true"
              name="password"
              value={state.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="auth_form-btn">
              {isLoading ? "Loading..." : "sign in"}
            </button>
          </div>
          <Link to="/register" className="auth_form-span">
            Don't have an account
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
