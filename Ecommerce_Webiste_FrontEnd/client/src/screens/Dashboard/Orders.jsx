import { Link, useParams } from "react-router-dom";
import Wrapper from "../../Layout/Wrapper";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { useGetOrdersQuery } from "../../api/orderAPI";

const Orders = () => {
  const { pageNumber } = useParams();
  const { isLoading, data } = useGetOrdersQuery(pageNumber || 1);
  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />

      {!isLoading ? (
        data?.orders?.items.length ? (
          <table className="w-full bg-gray-900 rounded-md">
            <thead>
              <tr className="border-b border-b-gray-800 text-left">
                <th className="px-3 py-4 uppercase text-gray-400">Title</th>
                <th className="px-3 py-4 uppercase text-gray-400">
                  quantities
                </th>
                <th className="px-3 py-4 uppercase text-gray-400">image</th>
                <th className="px-3 py-4 uppercase text-gray-400">Received</th>
                <th className="px-3 py-4 uppercase text-gray-400">Delivered</th>
                <th className="px-3 py-4 uppercase text-gray-400">details</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.items?.map((order) => {
                return (
                  <tr key={order.id} className="odd:bg-gray-800">
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {order.product.title}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {order.quantity}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <img
                        src={order.product.image1}
                        className="w-16 h-16 rounded-full"
                        alt={order.product.title}
                      />
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {order.received ? "Yes" : "No"}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {order.status ? "Yes" : "No"}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <Link
                        className="bg-indigo-500 text-white px-3 py-2 rounded-sm cursor-pointer"
                        to={`/dashboard/order-details/${order.id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>No Orders</h3>
        )
      ) : (
        <Spinner />
      )}
      {/* paginate */}
      <Pagination
        pageNumber={data?.orders?.pageNumber}
        count={data?.orders?.count}
        pageSize={data?.orders?.pageSize}
        link="/dashboard/orders"
      />
    </Wrapper>
  );
};

export default Orders;
