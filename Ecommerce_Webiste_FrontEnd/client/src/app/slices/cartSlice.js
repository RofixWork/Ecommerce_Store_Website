import { createSlice } from "@reduxjs/toolkit";

const caclTotal = (cartItems) => {
  if (cartItems.length) {
    const total = cartItems.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
    return total;
  }
  return 0;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    total: caclTotal(JSON.parse(localStorage.getItem("cart")) || []),
  },
  reducers: {
    //handle add to cart
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.total = caclTotal(state.cart);
    },
    // handle increment
    increment: (state, action) => {
      const cartItems = state.cart.map((product) => {
        if (product.id === action.payload) {
          product.quantity = product.quantity > 1 ? product.quantity - 1 : 1;
        }
        return product;
      });
      state.cart = cartItems;
      state.total = caclTotal(cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    },
    // handle decrement
    decrement: (state, action) => {
      const cartItems = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity =
            product.quantity < action.payload.stock
              ? product.quantity + 1
              : product.quantity;
        }
        return product;
      });
      state.cart = cartItems;
      state.total = caclTotal(cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    },
    // delete item in the cart
    deleteItemInTheCart: (state, action) => {
      const newCart = state.cart.filter((p) => p.id !== action.payload);
      state.cart = newCart;
      state.total = caclTotal(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  increment,
  decrement,
  deleteItemInTheCart,
  resetCart,
} = cartSlice.actions;
