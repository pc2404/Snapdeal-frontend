import { Box, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts } from "../../redux/ProductSlice";
import Products from "../products/Products";

import Sidebar from "./Sidebar";

const Home = () => {
  const category = useSelector((state) => state.category);
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCategoryProducts = async (category) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const catProducts = await response.json();
    const productsArray = catProducts.products;
    console.log("catProducts", productsArray);
    dispatch(setProducts({ products: productsArray }));
  };

  const getAllProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const allProducts = await response.json();
    const productsArray = allProducts.products;

    console.log("all products", allProducts.allProducts);
    dispatch(setProducts({ products: productsArray }));
  };

  const getSearchedProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerm}`
    );
    const searchProducts = await response.json();
    console.log("searched products", searchProducts);
    dispatch(setProducts({ products: searchProducts.products }));
    navigate("/");
  };
  useEffect(() => {
    console.log("category", category);

    if (searchTerm !== "") {
      getSearchedProducts();
    } else {
      if (category === "All Products") {
        getAllProducts();
      } else {
        getCategoryProducts(category);
      }
    }
  }, [category, searchTerm]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }} spacing={2}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          padding: 2,
          marginLeft: 6,

          // display: { sx: "none", md: "default" },
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ height: "90vh" }}>
        <Products />
      </Box>
    </Stack>
  );
};

export default Home;
