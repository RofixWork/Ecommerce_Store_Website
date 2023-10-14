import { useGetCategoryProdcuctsQuery } from "../../api/productAPI";
import Header from "../../components/Header";
import Nav from "../../components/home/Nav";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../components/home/Skeleton";
import currencyFormatter from "currency-formatter";
import Pagination from "../../components/Pagination";
const CatProducts = () => {
  //params
  const { categoryName, pageNumber } = useParams();
  //fetch data
  const { data, isFetching } = useGetCategoryProdcuctsQuery({
    categoryName,
    pageNumber: pageNumber || 1,
  });

  return (
    <div>
      <Nav />
      <Header>#{categoryName}</Header>
      <div className="px-2 lg:px-0 container py-[60px]">
        {isFetching ? (
          <Skeleton numberOfItems={6} height={"300px"} colunms={"3"} />
        ) : data?.categoryProducts?.products?.length ? (
          <div>
            <h2 className="text-xl font-mono sm:text-2xl mb-3 font-bold text-gray-700">
              {data?.categoryProducts?.products?.length} Products found in #
              {categoryName} Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {data?.categoryProducts?.products.map((product) => {
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
          <h3 className="alert-error">
            No Products found in category #{categoryName}
          </h3>
        )}
      </div>
      {data?.categoryProducts?.products?.length ? (
        <Pagination
          pageNumber={data?.categoryProducts?.pageNumber}
          pageSize={data?.categoryProducts?.pageSize}
          count={data?.categoryProducts?.count}
          link={"/cat-products/electronic"}
          admin={false}
        />
      ) : null}
    </div>
  );
};

export default CatProducts;
