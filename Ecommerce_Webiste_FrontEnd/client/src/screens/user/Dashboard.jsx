import React, { useEffect } from "react";
import Nav from "../../components/home/Nav";
import Header from "../../components/Header";
import AccountList from "../../components/home/AccountList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentQuery } from "../../api/paymentAPI";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetCart } from "../../app/slices/cartSlice";
import UserInfo from "../../components/home/UserInfo";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { data, isSuccess } = useVerifyPaymentQuery(sessionId, {
    skip: sessionId ? false : true,
  });

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("cart");
      toast.success(data?.message);
      dispatch(resetCart());
      navigate("/user");
    }
  }, [isSuccess]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Nav />
      <Header>My Account</Header>
      <AccountList >
        <UserInfo/>
      </AccountList>
    </>
  );
};

export default Dashboard;
