import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  products: [],
  searchTerm: "",
  cartProducts: [],
  category: "All Products",
  address: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = "";
      state.token = "";
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setCartProducts: (state, action) => {
      const userIdIndex = state.cartProducts.findIndex(
        (cartProd) => cartProd.userId === state.user._id
      );
      const cardProductObj = {
        id: action.payload.cardProduct.id,
        title: action.payload.cardProduct.title,
        thumbnail: action.payload.cardProduct.thumbnail,
        description: action.payload.cardProduct.description,
        price: action.payload.cardProduct.price,
        qty: action.payload.cardProduct.qty,
      };
      if (userIdIndex === -1) {
        const newUserCartObj = {
          userId: state.user._id,
          userCartProducts: [cardProductObj],
        };
        state.cartProducts.push(newUserCartObj);
      } else {
        const index = state.cartProducts[
          userIdIndex
        ].userCartProducts.findIndex(
          (userCartProd) => userCartProd.id === action.payload.cardProduct.id
        );
        if (index === -1) {
          state.cartProducts[userIdIndex].userCartProducts.push(cardProductObj);
        }
      }
    },

    setIncreaseCartQty: (state, action) => {
      const userIdIndex = state.cartProducts.findIndex(
        (cartProd) => cartProd.userId === state.user._id
      );
      if (userIdIndex !== -1) {
        const index = state.cartProducts[
          userIdIndex
        ].userCartProducts.findIndex(
          (userCartProd) => userCartProd.id === action.payload.id
        );

        if (index !== -1) {
          state.cartProducts[userIdIndex].userCartProducts[index].qty++;
        }
      }
    },
    setDecreaseCartQty: (state, action) => {
      const userIdIndex = state.cartProducts.findIndex(
        (cartProd) => cartProd.userId === state.user._id
      );
      if (userIdIndex !== -1) {
        const index = state.cartProducts[
          userIdIndex
        ].userCartProducts.findIndex(
          (userCartProd) => userCartProd.id === action.payload.id
        );

        if (
          index !== -1 &&
          state.cartProducts[userIdIndex].userCartProducts[index].qty > 1
        ) {
          state.cartProducts[userIdIndex].userCartProducts[index].qty--;
        }
      }
    },

    setRemoveCartProduct: (state, action) => {
      const userIdIndex = state.cartProducts.findIndex(
        (cartProd) => cartProd.userId === state.user._id
      );
      if (userIdIndex !== -1) {
        const updatedCartProducts = state.cartProducts[
          userIdIndex
        ].userCartProducts.filter((cartProd) => {
          return cartProd.id !== action.payload.id;
        });
        state.cartProducts[userIdIndex].userCartProducts = updatedCartProducts;
      }
    },

    setEmptyCart: (state, action) => {
      const userIdIndex = state.cartProducts.findIndex(
        (cartProd) => cartProd.userId === state.user._id
      );
      if (userIdIndex !== -1) {
        state.cartProducts[userIdIndex].userCartProducts.length = 0;
      }
    },
  },
});

export const {
  setLogin,
  setLogout,
  setProducts,
  setCategory,
  setSearchTerm,
  setCartProducts,
  setRemoveCartProduct,
  setIncreaseCartQty,
  setDecreaseCartQty,
  setEmptyCart,
} = productSlice.actions;
export default productSlice.reducer;
