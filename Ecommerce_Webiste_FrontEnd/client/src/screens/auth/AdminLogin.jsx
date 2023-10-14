import { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../api/authAPI";
import { useDispatch } from "react-redux";
import { setAdminToken } from "../../app/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  //usenavigate
  const navigate = useNavigate();
  //use dispatch (react-redux)
  const dispatch = useDispatch();
  //auth api hook
  const [userLogin, { isLoading, error, isSuccess, data }] =
    useAuthLoginMutation();

  //get all errors
  const getErrors = error?.data?.errors || [];

  //state
  const [dataUser, setDataUser] = useState(() => {
    return {
      email: "",
      password: "",
    };
  });
  //handle change function
  function handleChange(e) {
    const { name, value } = e.target;

    setDataUser((prev) => {
      return { ...prev, [name]: value };
    });
  }
  //login admin function
  const adminLoginFunc = (e) => {
    e.preventDefault();

    userLogin(dataUser);
  };

  // use effect hook
  useEffect(() => {
    //check state response
    if (isSuccess) {
      //save token to local storage
      localStorage.setItem("admin-token", data?.token);
      dispatch(setAdminToken(data?.token));
      navigate("/dashboard/products");
    }
  }, [isSuccess]);

  return (
    <div className="bg-black1 h-screen flex items-center justify-center">
      <form
        onSubmit={adminLoginFunc}
        className="bg-black2 px-3 py-4 rounded-sm w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12"
      >
        <h3 className="text-xl mb-4 text-white font-semibold">
          Dashboard Login
        </h3>

        {/* print error */}
        {getErrors?.length ? (
          <>
            {getErrors.map((error, index) => {
              return (
                <h4
                  className="bg-red-200 text-red-700 p-2 rounded-sm mb-2 font-semibold text-lg"
                  key={index}
                >
                  {error}
                </h4>
              );
            })}
          </>
        ) : null}
        {/* print error */}
        {/* inputs (email and password) */}
        <div className="mb-4">
          <input
            className="form-control"
            type="email"
            placeholder="Enter your Email..."
            name="email"
            value={dataUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="form-control"
            type="password"
            placeholder="Enter your Password..."
            name="password"
            value={dataUser.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-xl rounded font-semibold uppercase"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
