import { Link, useParams } from "react-router-dom";
import Wrapper from "../../Layout/Wrapper";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../api/productAPI";
import ScreenHeader from "../../components/ScreenHeader";
import { PlusIcon } from "@heroicons/react/24/solid";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const Products = () => {
  //param
  const { pageNumber } = useParams();
  //pagination
  const { data, isLoading } = useGetAllProductsQuery(pageNumber || 1);
  //delete product
  const [
    deleteProduct,
    { isSuccess: productDeletedSuccess, data: deletedProductData },
  ] = useDeleteProductMutation();

  const handleDeleteProduct = (id) => {
    const confirm = window.confirm(
      "Are you sure you want delete this Product?"
    );

    if (confirm) {
      deleteProduct(id);
    }
  };

  useEffect(() => {
    if (productDeletedSuccess) {
      toast.success(deletedProductData.message);
    }
  }, [productDeletedSuccess]);
  return (
    <Wrapper>
      <Toaster position="top-center" reverseOrder={false} />
      <ScreenHeader
        title="Create Product"
        link="/dashboard/create-product"
        icon={<PlusIcon className="h-5 w-5" />}
      />

      {!isLoading ? (
        data?.products?.items.length ? (
          <table className="w-full bg-gray-900 rounded-md">
            <thead>
              <tr className="border-b border-b-gray-800 text-left">
                <th className="px-3 py-4 uppercase text-gray-400">Name</th>
                <th className="px-3 py-4 uppercase text-gray-400">Price</th>
                <th className="px-3 py-4 uppercase text-gray-400">Stock</th>
                <th className="px-3 py-4 uppercase text-gray-400">Image</th>
                <th className="px-3 py-4 uppercase text-gray-400  ">Edit</th>
                <th className="px-3 py-4 uppercase text-gray-400">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.items?.map((product) => {
                return (
                  <tr key={product.id} className="odd:bg-gray-800">
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {product.title}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      ${product.price}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      {product.stock}
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <img
                        src={product.image1}
                        className="w-20 h-20 rounded-md"
                        alt={product.title}
                      />
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <Link
                        className="bg-amber-500 text-white px-3 py-2 rounded-sm cursor-pointer"
                        to={`/dashboard/edit-product/${product.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="p-3 text-gray-400 font-medium capitalize">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        type="button"
                        className="bg-red-500 text-white px-3 py-2 rounded-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>No Products</h3>
        )
      ) : (
        <Spinner />
      )}
      {/* paginate */}
      <Pagination
        pageNumber={data?.products?.pageNumber}
        count={data?.products?.count}
        pageSize={data?.products?.pageSize}
        link="/dashboard/products"
      />
    </Wrapper>
  );
};

export default Products;
