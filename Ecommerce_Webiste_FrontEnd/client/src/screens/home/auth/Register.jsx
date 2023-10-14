import React, { useEffect, useState } from "react";
import Nav from "../../../components/home/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuthRegisterMutation } from "../../../api/authAPI";
import toast, { Toaster } from "react-hot-toast";
import useForm from "../../../hooks/Form";

const Register = () => {
  const navigate = useNavigate();
  //mutation
  const [authRegister, { isLoading, isError, data, error, isSuccess }] =
    useAuthRegisterMutation();
  const getAllErrors = error?.data?.errors || [];
  const { state, onChange: handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authRegister(state);
  };

  useEffect(() => {
    if (getAllErrors?.length) {
      getAllErrors?.forEach((error) => toast.error(error));
    }
  }, [isError]);
  //sucess
  useEffect(() => {
    let time;
    if (isSuccess) {
      toast.success(data?.message);
      time = setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    return () => clearTimeout(time);
  }, [isSuccess]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Nav />
      <div className="px-2 sm:px-0 min-h-screen w-full flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="auth_form">
          <h2 className="uppercase text-xl font-bold mb-3 text-gray-800">
            sign up
          </h2>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="mb-2 block font-semibold text-lg"
            >
              Username
            </label>
            <input
              className="auth_form-input"
              type="text"
              id="username"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>
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
              onChange={handleChange}
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
              name="password"
              value={state.password}
              onChange={handleChange}
              autoComplete="true"
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="auth_form-btn">
              {isLoading ? "Loading..." : "sign up"}
            </button>
          </div>
          <Link to="/login" className="auth_form-span">
            Already have an account
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
