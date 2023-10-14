import React, { useEffect } from "react";
import Nav from "../../components/home/Nav";
import Header from "../../components/Header";
import AccountList from "../../components/home/AccountList";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetUserOrdersQuery,
  useUserUpdateOrderPartialMutation,
} from "../../api/userOrderAPI";
import currency from "currency-formatter";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import toast, { Toaster } from "react-hot-toast";

const UserOrders = () => {
  const { pageNumber } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data, isSuccess, isLoading } = useGetUserOrdersQuery(
    { pageNumber: pageNumber || 1, userId: user?.Id },
    { skip: user ? false : true }
  );

  //received
  const [
    receiveOrder,
    {
      isLoading: isLoadingOrderReceived,
      isSuccess: isOrderReceivedSuccess,
      data: orderReceivedData,
    },
  ] = useUserUpdateOrderPartialMutation();
  const handleReceiveOrder = (id) => {
    receiveOrder({ id, userId: user?.Id, path: "received" });
  };
  useEffect(() => {
    if (isOrderReceivedSuccess) {
      toast.success(orderReceivedData?.message);
    }
  }, [isOrderReceivedSuccess]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Nav />
      <Header>User Orders</Header>
      <AccountList>
        {isSuccess ? (
          data?.orders?.products?.length ? (
            <>
              <table className="w-full">
                <thead className="bg-gray-200 border-b border-b-gray-600">
                  <tr className="text-left">
                    <th className="py-3 px-1 text-gray-600">Image</th>
                    <th className="py-3 px-1 text-gray-600">Name</th>
                    <th className="py-3 px-1 text-gray-600">Total</th>
                    <th className="py-3 px-1 text-gray-600">Details</th>
                    <th className="py-3 px-1 text-gray-600">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.products?.map((order) => {
                    const discount = order.product?.discount / 100;
                    const discountPrice =
                      order.product?.price - order.product?.price * discount;
                    return (
                      <tr key={order.id} className="odd:bg-gray-50">
                        <td className="py-2 px-1">
                          <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                            <img
                              src={order.product.image1}
                              className=" w-full h-full object-cover"
                              alt={order.product.title}
                            />
                          </div>
                        </td>
                        <td className="py-1 text-base capitalize font-semibold">
                          {order.product.title}
                        </td>
                        <td className="py-1 text-base capitalize font-semibold">
                          {currency.format(discountPrice * order.quantity, {
                            code: "USD",
                          })}
                        </td>
                        <td className="py-1 text-base capitalize font-semibold">
                          <Link
                            to={`/user-order-details/${order.id}`}
                            className="cursor-pointer bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all"
                          >
                            Details
                          </Link>
                        </td>
                        <td className="py-1 text-base capitalize font-semibold">
                          {order?.status ? (
                            order?.received ? (
                              <span className="text-green-500 text-base">
                                Received
                              </span>
                            ) : (
                              <button
                                onClick={() => handleReceiveOrder(order?.id)}
                                className="cursor-pointer bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all"
                              >
                                {isLoadingOrderReceived
                                  ? "Loading..."
                                  : "Received?"}
                              </button>
                            )
                          ) : (
                            <span className="text-rose-500 text-base">
                              Under Process
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                pageNumber={data?.orders?.pageNumber}
                count={data?.orders?.count}
                pageSize={data?.orders?.pageSize}
                link="/user-orders"
                admin={false}
              />
            </>
          ) : (
            <h3>No Orders</h3>
          )
        ) : (
          <Spinner />
        )}
      </AccountList>
    </>
  );
};

export default UserOrders;
