import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCartProducts,
  setRemoveCartProduct,
} from "../../redux/ProductSlice";

const ProductDetail = () => {
  const [productObj, setProductObj] = useState({});
  const [isAddCart, setIsAddCart] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cartProducts);
  const token = useSelector((state) => state.token);
  const generateRandomNum = (mutiplyFactor) => {
    return (Math.random() * mutiplyFactor).toFixed(0);
  };
  console.log("productobj", productObj);

  const getSingleProduct = async () => {
    console.log("inside");
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const singleProduct = await response.json();
    console.log(singleProduct);
    setProductObj(singleProduct);
  };

  useEffect(() => {
    console.log("useeffect");
    getSingleProduct();
  }, [id]);

  console.log(productObj);
  return (
    <Card
      sx={{
        maxWidth: "1200px",
        height: { xs: "auto", md: "400px" },
        position: "absolute",
        top: "20%",
        left: { xs: "0", md: "8%" },
      }}
    >
      <Stack
        sx={{ flexDirection: { md: "row", xs: "column" } }}
        gap={2}
        width="100%"
        height="100%"
      >
        <Stack direction="row" gap={2}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            {/* {productObj.images.slice(0, 2).map((image) => {
              return (
                <CardMedia
                  component="img"
                  height="50"
                  width="50"
                  image={image}
                  alt="Paella dish"
                />
              );
            })} */}
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <CardMedia
              component="img"
              height="80%"
              image={productObj.thumbnail}
              alt="Paella dish"
              sx={{ borderRadius: "10px" }}
            />
          </Stack>
        </Stack>
        <Stack>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {productObj.title}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {productObj.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Stack direction="row">
              <Star sx={{ color: "#FFC214" }} />
              <Star sx={{ color: "#FFC214" }} />
              <Star sx={{ color: "#FFC214" }} />
              <StarHalf sx={{ color: "#FFC214" }} />
              <StarOutline sx={{ color: "#FFC214" }} />
              <Typography variant="body1" color="text.secondary">
                ({productObj.rating})
              </Typography>
            </Stack>
            <Button size="large">{`${generateRandomNum(
              10000
            )} Ratings`}</Button>
            <Button size="large">{`${generateRandomNum(1000)} Reviews`}</Button>
            <Button size="large">{`${generateRandomNum(100)} Selfies`}</Button>
            <Button size="large">Have a question?</Button>
          </CardActions>
          {token ? (
            <CardActions>
              {!isAddCart ? (
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: "#333333",
                    ":hover": { bgcolor: "grey" },
                  }}
                  onClick={() => {
                    // if (cartProducts && cartProducts.id !== productObj.id) {
                    // }
                    dispatch(
                      setCartProducts({
                        cardProduct: {
                          id: productObj.id,
                          title: productObj.title,
                          thumbnail: productObj.thumbnail,
                          description: productObj.description,
                          price: productObj.price,
                          qty: 1,
                        },
                      })
                    );

                    setIsAddCart((prev) => !prev);
                  }}
                >
                  ADD TO CART
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: "#333333",
                    ":hover": { bgcolor: "grey" },
                  }}
                  onClick={() => {
                    dispatch(setRemoveCartProduct({ id: productObj.id }));

                    setIsAddCart((prev) => !prev);
                  }}
                >
                  REMOVE
                </Button>
              )}

              <Button
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "#E40144",
                  ":hover": { bgcolor: "grey" },
                }}
                onClick={() => navigate("/cart")}
              >
                BUY NOW
              </Button>
            </CardActions>
          ) : (
            <Typography varient="body2" color="text.primary">
              Please login to place order.
            </Typography>
          )}
          <Stack sx={{ position: "absolute", bottom: 20 }}>
            <Typography varient="body2" color="text.secondary">
              7 Days Easy Returns Trustpay:
            </Typography>
            <Typography varient="body2" color="text.secondary">
              100% Payment Protection. Return or Replacement is applicable for 7
              days after delivery Know More
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductDetail;
