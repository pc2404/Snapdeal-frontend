import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ prod }) => {
  const [cartClicked, setCartClicked] = useState(false);
  const navigate = useNavigate();
  const MyButton = styled(Button)({
    width: "70px",
    color: "grey",
    padding: 0,
    margin: 0,
  });
  return (
    <Card sx={{ width: { md: 250, xs: "100%" }, height: 400 }} key={prod.id}>
      <CardMedia
        component="img"
        alt={prod.title}
        height="250"
        image={prod.thumbnail}
      />
      <CardContent
        sx={{ padding: 1, cursor: "pointer" }}
        onClick={() => navigate(`/product/${prod.id}`)}
      >
        <Typography gutterBottom variant="h5" component="div">
          {prod.title.slice(0, 20)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {prod.description.slice(0, 80)}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="column">
          <Stack direction="row">
            <Star sx={{ color: "#FFC214" }} />
            <Star sx={{ color: "#FFC214" }} />
            <Star sx={{ color: "#FFC214" }} />
            <StarHalf sx={{ color: "#FFC214" }} />
            <StarOutline sx={{ color: "#FFC214" }} />
          </Stack>
          <Stack direction="row">
            <MyButton sx={{ textDecoration: "line-through" }}>{`Rs ${(
              (prod.price / (100 - prod.discountPercentage)) *
              100
            ).toFixed(0)}`}</MyButton>
            <MyButton sx={{ color: "black" }}>{`Rs ${prod.price}`}</MyButton>
            <MyButton variant="outlined">
              {`${prod.discountPercentage}% OFF`}
            </MyButton>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
