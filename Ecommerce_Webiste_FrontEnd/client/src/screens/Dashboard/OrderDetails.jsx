import { Link, useParams } from "react-router-dom";
import Wrapper from "../../Layout/Wrapper";
import Spinner from "../../components/Spinner";
import {
  useGetOrderQuery,
  useOrderUpdatePartialMutation,
} from "../../api/orderAPI";
import currency from "currency-formatter";
import ScreenHeader from "../../components/ScreenHeader";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BsFillPrinterFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
const OrderDetails = () => {
  const [
    deliverOrder,
    {
      isLoading: isLoadingOrderDelivered,
      isSuccess: isOrderDeliveredSuccess,
      data: orderdeliveredData,
    },
  ] = useOrderUpdatePartialMutation();
  // react to print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: { margin: "0 10px" },
    documentTitle: "Print Order Details",
  });
  //   react to print
  const { id } = useParams();
  const { isLoading, data, isSuccess } = useGetOrderQuery(id);
  const discount = data?.order?.product?.discount / 100;
  const discountPrice =
    data?.order?.product?.price - data?.order?.product?.price * discount;

  //delivered order
  const handleDeliveredOrder = (id) => {
    deliverOrder({ id, path: "status" });
  };

  useEffect(() => {
    if (isOrderDeliveredSuccess) {
      toast.success(orderdeliveredData?.message);
    }
  }, [isOrderDeliveredSuccess]);
  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <ScreenHeader
        title="orders List"
        link="/dashboard/orders"
        icon={<ArrowSmallLeftIcon className="h-5 w-5" />}
      />
      {isSuccess && data?.order ? (
        <div className="flex items-center gap-x-2">
          <button
            className="bg-indigo-500 rounded-sm cursor-pointer text-white px-4 py-2 mb-3 flex items-center gap-x-2 text-lg font-semibold"
            onClick={handlePrint}
            title="Print"
          >
            <BsFillPrinterFill size={20} />
            <span>Print</span>
          </button>
          {!data?.order?.status ? (
            <button
              onClick={() => handleDeliveredOrder(data?.order?.id)}
              className="bg-orange-500 rounded-sm cursor-pointer text-white px-4 py-2 mb-3 text-lg font-semibold"
            >
              {isLoadingOrderDelivered ? "Loading..." : "Delivered"}
            </button>
          ) : null}
        </div>
      ) : null}

      {!isLoading ? (
        data?.order ? (
          <div ref={componentRef}>
            <div className="my-3 border border-gray-200 w-full"></div>
            <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
              Order Number:{" "}
              <span className="text-orange-400 ml-1 font-sans font-bold">
                {data?.order?.id}
              </span>
            </h3>
            <div className="my-3 border border-gray-200 w-full"></div>
            <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
              Product Name:{" "}
              <span className="text-orange-400 ml-1 font-sans font-bold">
                {data?.order?.product?.title}
              </span>
            </h3>
            <div className="my-3 border border-gray-200 w-full"></div>
            <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
              Received:{" "}
              <span className="text-orange-400 ml-1 font-sans font-bold">
                {data?.order?.received ? "Yes" : "No"}
              </span>
            </h3>
            <div className="my-3 border border-gray-200 w-full"></div>
            <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
              Order Date:
              <span className="text-orange-400 ml-1 font-sans font-bold">
                {moment(data?.order?.createdData).format("MMMM Do YYYY")}
              </span>
            </h3>
            {data?.order?.received ? (
              <>
                <div className="my-3 border border-gray-200 w-full"></div>
                <h3 className="mb-3 text-xl font-semibold font-mono uppercase">
                  Received Date:
                  <span className="text-orange-400 ml-1 font-sans font-bold">
                    {moment(data?.order?.updatedData).format("MMMM Do YYYY")}
                  </span>
                </h3>
              </>
            ) : null}
            <div className="my-3 border border-gray-200 w-full"></div>

            <h3 className="mb-3 text-xl font-semibold font-mono">
              Customer Name:
              <span className="text-orange-400 ml-1 font-sans font-bold">
                {data?.order?.user?.name}
              </span>
            </h3>
            <table className="w-full bg-gray-900 rounded-md">
              <thead>
                <tr className="border-b border-b-gray-800 text-left">
                  <th className="px-3 py-4 uppercase text-gray-400">image</th>
                  <th className="px-3 py-4 uppercase text-gray-400">
                    quantities
                  </th>
                  <th className="px-3 py-4 uppercase text-gray-400">price</th>
                  <th className="px-3 py-4 uppercase text-gray-400">total</th>
                </tr>
              </thead>
              <tbody>
                <tr key={data?.order.id} className="odd:bg-gray-800">
                  <td className="p-3 text-gray-400 font-medium capitalize">
                    <img
                      src={data?.order.product.image1}
                      className="w-16 h-16 rounded-full"
                      alt={data?.order.product.title}
                    />
                  </td>
                  <td className="p-3 text-gray-400 font-medium capitalize">
                    {data?.order?.quantity}
                  </td>
                  <td className="p-3 text-gray-400 font-medium capitalize">
                    {currency.format(discountPrice, {
                      code: "USD",
                    })}
                  </td>
                  <td className="p-3 text-gray-400 font-medium capitalize">
                    {currency.format(discountPrice * data?.order?.quantity, {
                      code: "USD",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <h3>No Orders</h3>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default OrderDetails;
