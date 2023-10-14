import React from "react";
import { useGetAllProductsQuery } from "../../api/productAPI";
import { Link } from "react-router-dom";
import currencyFormatter from "currency-formatter";
import Skeleton from "./Skeleton";
const HomeProducts = () => {
  const { data, isFetching } = useGetAllProductsQuery();
  return (
    <>
      <div className="px-2 lg:px-0 container py-[60px]">
        <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
          Products
        </h3>
        {isFetching ? (
          <Skeleton numberOfItems={6} height={"300px"} colunms={"3"} />
        ) : data?.products?.length ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {data?.products.map((product) => {
                const discount = product.discount / 100;
                const discountPrice = product.price - product.price * discount;
                return (
                  <div
                    key={product.id}
                    className="overflow-hidden border-2 border-gray-300 rounded-sm shadow"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="w-full h-[350px] ">
                        <img
                          className="w-full h-full object-cover"
                          src={product.image1}
                          alt={product.title}
                        />
                      </div>
                      <div className="py-3 px-2">
                        <h3 className="capitalize text-xl font-bold text-gray-800">
                          {product.title}
                        </h3>
                        <h4 className="mt-2 flex justify-between items-center">
                          <span className="text-2xl text-gray-900 font-bold font-mono">
                            {currencyFormatter.format(discountPrice, {
                              code: "USD",
                            })}
                          </span>
                          <span className="line-through text-xl text-gray-600 font-semibold font-mono">
                            {currencyFormatter.format(product.price, {
                              code: "USD",
                            })}
                          </span>
                        </h4>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h3 className="alert-error">No Products</h3>
        )}
      </div>
    </>
  );
};

export default HomeProducts;
