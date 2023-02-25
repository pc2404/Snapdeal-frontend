import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CartTableRow from "./CartTableRow";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartCard = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const user_Id = useSelector((state) => state.user?._id);
  const userIdIndex = cartProducts.findIndex(
    (cartProd) => cartProd.userId === user_Id
  );
  // ----Table calculation-----
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function subtotal(items) {
    return items
      .map(({ price, qty }) => price * qty)
      .reduce((sum, i) => sum + i, 0);
  }

  const invoiceTotal = token
    ? subtotal(cartProducts[userIdIndex].userCartProducts)
    : 0;

  if (!token || cartProducts[userIdIndex].userCartProducts.length === 0) {
    return toast("Your Shoping Cart is Empty!");
  }

  return (
    <TableContainer component={Paper} sx={{ padding: 4 }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Product Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">SubTotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProducts[userIdIndex].userCartProducts.length &&
            cartProducts[userIdIndex].userCartProducts.map((cartProd) => (
              <CartTableRow cartProd={cartProd} sx={{ width: "100%" }} />
            ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell align="right">
              <Button
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "#333333",
                  ":hover": { bgcolor: "grey" },
                }}
                onClick={() => navigate("/payment")}
              >
                Proceed to checkout
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartCard;
