import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Products = () => {
  const productArray = useSelector((state) => state.products);
  return (
    <Paper sx={{ marginRight: 2 }}>
      <Stack direction="row" gap={2} flexWrap="wrap" p={2}>
        {productArray.map((prod) => {
          return <ProductCard prod={prod} />;
        })}
      </Stack>
    </Paper>
  );
};

export default Products;
