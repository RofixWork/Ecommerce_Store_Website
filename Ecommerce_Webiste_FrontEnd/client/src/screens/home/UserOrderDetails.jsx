import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetUserOrderDetailsQuery } from "../../api/userOrderAPI";
import AccountList from "../../components/home/AccountList";
import Nav from "../../components/home/Nav";
import Header from "../../components/Header";
import currency from "currency-formatter";
import Spinner from "../../components/Spinner";
import ScreenHeader from "../../components/ScreenHeader";
import moment from "moment";
const UserOrderDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, data } = useGetUserOrderDetailsQuery(
    { orderId: id, userId: user?.Id },
    { skip: user ? false : true }
  );
  const discount = data?.order?.product?.discount / 100;
  const discountPrice =
    data?.order?.product?.price - data?.order.product?.price * discount;
  return (
    <>
      <Nav />
      <Header>User Orders</Header>
      <AccountList>
        <>
          {isSuccess && data?.order ? (
            <>
              <ScreenHeader title={"Back"} link={"/user-orders"} />
              <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
                Order Number:{" "}
                <span className="text-indigo-500 ml-1 font-sans font-bold">
                  {data?.order?.id}
                </span>
              </h3>
              <div className="my-3 border border-gray-200 w-full"></div>
              <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
                Product Name:{" "}
                <span className="text-indigo-500 ml-1 font-sans font-bold">
                  {data?.order?.product?.title}
                </span>
              </h3>
              <div className="my-3 border border-gray-200 w-full"></div>
              <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
                Received:{" "}
                <span className="text-indigo-500 ml-1 font-sans font-bold">
                  {data?.order?.received ? "Yes" : "No"}
                </span>
              </h3>
              <div className="my-3 border border-gray-200 w-full"></div>
              <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
                Order Date:
                <span className="text-indigo-500 ml-1 font-sans font-bold">
                  {moment(data?.order?.createdData).format("MMMM Do YYYY")}
                </span>
              </h3>
              <div className="my-3 border border-gray-200 w-full"></div>
              {data?.order?.received ? (
                <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
                  Received Date:
                  <span className="text-indigo-500 ml-1 font-sans font-bold">
                    {moment(data?.order?.updatedData).format("MMMM Do YYYY")}
                  </span>
                </h3>
              ) : null}
              <table className="w-full">
                <thead className="bg-gray-200 border-b border-b-gray-600">
                  <tr className="text-left">
                    <th className="py-3 px-1 text-gray-600">Image</th>
                    <th className="py-3 px-1 text-gray-600">Color</th>
                    <th className="py-3 px-1 text-gray-600">Price</th>
                    <th className="py-3 px-1 text-gray-600">Quantities</th>
                    <th className="py-3 px-1 text-gray-600">Total</th>
                    <th className="py-3 px-1 text-gray-600">Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={data?.order?.id} className="odd:bg-gray-50">
                    <td className="py-2 px-1">
                      <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                        <img
                          src={data?.order?.product.image1}
                          className=" w-full h-full object-cover"
                          alt={data?.order?.product.title}
                        />
                      </div>
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {data?.order?.color && (
                        <div
                          className="w-[25px] h-[25px] rounded-full"
                          style={{
                            backgroundColor: `${data?.order?.color}`,
                          }}
                        ></div>
                      )}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {currency.format(discountPrice, {
                        code: "USD",
                      })}
                    </td>
                    <td className="pr-0 sm:pr-2 w-[100px] py-1 text-base capitalize font-semibold">
                      {data?.order?.quantity}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {currency.format(discountPrice * data?.order?.quantity, {
                        code: "USD",
                      })}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {data?.order?.status ? "Yes" : "No"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <Spinner />
          )}
        </>
      </AccountList>
    </>
  );
};

export default UserOrderDetails;
