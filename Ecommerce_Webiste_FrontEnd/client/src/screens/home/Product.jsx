import { useGetProductQuery } from "../../api/productAPI";
import Spinner from "../../components/Spinner";
import Nav from "../../components/home/Nav";
import { Link, useParams } from "react-router-dom";
import currencyFormatter from "currency-formatter";
import htmlParser from "html-react-parser";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/slices/cartSlice";
import Quantity from "../../components/home/Quantity";
const Product = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(() => {
    return 1;
  });
  const [selectedSize, setSelectedSize] = useState(() => null);
  const [selectedColor, setSelectedColor] = useState(() => null);
  const { id } = useParams();
  //get product by id
  const { data } = useGetProductQuery(id);
  const discount = data?.product?.discount / 100;
  const discountPrice = data?.product?.price - data?.product?.price * discount;

  //increment
  const handleIncrement = () =>
    setQuantity((prev) => (prev != data?.product?.stock ? prev + 1 : prev));

  //decrement
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  //select sizes
  const handleSelectedSize = (size) => {
    const isFound = selectedSize?.id == size.id;

    if (isFound) {
      setSelectedSize((prev) => {
        return null;
      });
      return;
    }

    setSelectedSize((prev) => {
      return { ...size };
    });
  };
  //select colors
  const handleSelectedColor = (color) => {
    const isFound = selectedColor?.id == color.id;

    if (isFound) {
      setSelectedColor((prev) => {
        return null;
      });
      return;
    }

    setSelectedColor((prev) => {
      return { ...color };
    });
  };

  //add to cart
  const handleAddToCart = () => {
    const { sizes, colors, createdDate, updatedDate, ...newProduct } =
      data?.product;
    newProduct["size"] = selectedSize?.name;
    newProduct["price"] = discountPrice;
    newProduct["color"] = selectedColor?.color;
    newProduct["quantity"] = quantity;
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const checkProduct = cartItems.find((p) => p.id == newProduct.id);
    if (checkProduct) {
      toast.error(
        `This product <${checkProduct.title}> is already Exist in the Cart`
      );
      return;
    }

    cartItems.push(newProduct);
    dispatch(addToCart(newProduct));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Nav />
      {data?.product ? (
        <div className="mt-[80px] container">
          <nav className="px-2 lg:px-0 text-xl font-semibold font-mono capitalize text-gray-600">
            <Link to="/">Home</Link>
            <span> / </span>
            <Link to={`/cat-products/${data.product.category.name}`}>
              {data.product.category.name}
            </Link>
            <span> / </span>
            {data.product.title}
          </nav>
          {/* details */}
          <div className="px-2 lg:px-0 grid grid-col-1 md:grid-cols-2 py-10 gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md overflow-hidden">
                <img
                  src={data.product.image1}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-md overflow-hidden">
                <img
                  src={data.product.image2}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-md overflow-hidden ">
                <img
                  src={data.product.image3}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="capitalize text-3xl font-bold text-gray-800">
                {data.product.title}
              </h3>
              <h4 className="my-3 flex items-center gap-x-2">
                <span className="text-2xl text-gray-900 font-bold font-mono">
                  {currencyFormatter.format(discountPrice, {
                    code: "USD",
                  })}
                </span>
                <span className="line-through text-xl text-gray-600 font-semibold font-mono">
                  {currencyFormatter.format(data.product.price, {
                    code: "USD",
                  })}
                </span>
              </h4>
              {/* // sizes */}
              <div className="mb-3">
                {JSON.parse(data.product.sizes).length ? (
                  <>
                    <h3 className="text-2xl text-gray-900 font-bold font-mono">
                      Sizes
                    </h3>
                    <div className="mt-2 flex items-center gap-x-2">
                      {JSON.parse(data.product.sizes).map((size) => {
                        const findSize = selectedSize?.id == size.id;
                        return (
                          <div
                            onClick={() => handleSelectedSize(size)}
                            key={size.id}
                            className={`${
                              findSize && "bg-indigo-500 text-white"
                            }  mb-2 px-3 py-1 border border-gray-300 rounded-sm font-semibold uppercase cursor-pointer`}
                            id={size.id}
                          >
                            {size.name}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
              {/* // colors */}
              <div className="mb-3">
                {JSON.parse(data.product.colors).length ? (
                  <>
                    <h3 className="my-2 text-2xl text-gray-900 font-bold font-mono">
                      Colors
                    </h3>
                    <div className="flex items-center gap-x-3">
                      {JSON.parse(data.product.colors).map(({ id, color }) => {
                        const findColor = selectedColor?.id == id;
                        return (
                          <div
                            onClick={() => handleSelectedColor({ id, color })}
                            style={{ backgroundColor: color }}
                            key={id}
                            className={`${
                              findColor &&
                              "outline outline-[3px] outline-offset-2 outline-indigo-500"
                            } h-[40px] w-[40px] rounded-full cursor-pointer`}
                          ></div>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
              {/* add to cart */}
              <div className="mb-3">
                <div className="flex gap-x-2">
                  <Quantity
                    quantity={quantity}
                    handleAddToCart={handleAddToCart}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                  />
                  <button
                    onClick={handleAddToCart}
                    className="px-4 bg-indigo-500 text-white py-2 rounded-sm text-xl font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              {/* // description */}
              <div>
                <h3 className="mt-2 text-2xl text-gray-900 font-bold font-mono">
                  Description
                </h3>
                <div className="description">
                  {htmlParser(data?.product?.description)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Product;
