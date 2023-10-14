import React, { useEffect, useState } from "react";
import Nav from "../../components/home/Nav";
import { useDispatch, useSelector } from "react-redux";
import currency from "currency-formatter";
import Quantity from "../../components/home/Quantity";
import {
  decrement,
  deleteItemInTheCart,
  increment,
} from "../../app/slices/cartSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useSendPaymentMutation } from "../../api/paymentAPI";
const Cart = () => {
  // checkout
  const [sendPayment, { isLoading, isSuccess, data }] =
    useSendPaymentMutation();
  const navigate = useNavigate();
  //reducers
  const { cart, total } = useSelector((state) => state.cart);
  const { userToken, user } = useSelector((state) => state.auth);
  //dispatchers
  const dispatch = useDispatch();
  //increment
  const handleDecrement = (id) => {
    dispatch(increment(id));
  };
  //decrement
  const handleIncrement = ({ id, stock }) => {
    dispatch(decrement({ id, stock }));
  };
  //delete item in the cart
  const handleDeleteItemInTheCart = (id) => {
    dispatch(deleteItemInTheCart(id));
  };

  //check out
  const handleCheckout = () => {
    if (userToken) {
      const cartItems = cart.map((product) => {
        return {
          Id: product.id,
          Name: product.title,
          UnitAmount: product.price,
          Quantity: product.quantity,
          Color: product.color,
          Size: product.Size,
        };
      });
      console.log(cartItems);
      sendPayment({ cart: cartItems, email: user?.email });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = data?.url;
    }
  }, [isSuccess]);
  console.log(data);
  return (
    <>
      <Nav />
      <div className="container mt-[80px]">
        {cart.length ? (
          <table className="w-full">
            <thead className="bg-gray-200 border-b border-b-gray-600">
              <tr className="text-left">
                <th className="py-3 px-1 text-gray-600">Image</th>
                <th className="py-3 px-1 text-gray-600">Name</th>
                <th className="py-3 px-1 text-gray-600">Stock</th>
                <th className="py-3 px-1 text-gray-600">Color</th>
                <th className="py-3 px-1 text-gray-600">Size</th>
                <th className="py-3 px-1 text-gray-600">Price</th>
                <th className="py-3 px-1 text-gray-600">Quantities</th>
                <th className="py-3 px-1 text-gray-600">Total</th>
                <th className="py-3 px-1 text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                return (
                  <tr key={product.id} className="odd:bg-gray-50">
                    <td className="py-2 px-1">
                      <div className="w-[70px] h-[70px] overflow-hidden rounded-full">
                        <img
                          src={product.image1}
                          className=" w-full h-full object-cover"
                          alt={product.title}
                        />
                      </div>
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {product.title}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {product.stock}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {product.color ? (
                        <div
                          className="w-[25px] h-[25px] rounded-full"
                          style={{ backgroundColor: `${product.color}` }}
                        ></div>
                      ) : (
                        "No Color"
                      )}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {product.size || "No Size"}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {currency.format(product.price, { code: "USD" })}
                    </td>
                    <td className="pr-0 sm:pr-2 w-[100px] py-1 text-base capitalize font-semibold">
                      <Quantity
                        quantity={product.quantity}
                        handleDecrement={() => handleDecrement(product.id)}
                        handleIncrement={() =>
                          handleIncrement({
                            id: product.id,
                            stock: product.stock,
                          })
                        }
                      />
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      {currency.format(product.price * product.quantity, {
                        code: "USD",
                      })}
                    </td>
                    <td className="py-1 text-base capitalize font-semibold">
                      <button
                        className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-all"
                        onClick={() => handleDeleteItemInTheCart(product.id)}
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
          <h3>No items in the Cart...</h3>
        )}

        {cart.length ? (
          <div className="container mt-[20px] flex justify-start md:justify-end items-center gap-x-3">
            <h1 className="text-xl sm:text-3xl font-semibold">
              Total: {currency.format(total, { code: "USD" })}
            </h1>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-indigo-500 text-white text-xl font-semibold cursor-pointer rounded-md font-mono uppercase"
            >
              {isLoading ? "Checking..." : "CheckOut"}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
