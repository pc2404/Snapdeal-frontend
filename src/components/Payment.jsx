import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import gpay from "../assets/google-pay-icon.png";
import paytm from "../assets/paytm-icon.png";
import phonepay from "../assets/phonepe-logo-icon.png";
import cod from "../assets/cod-icon.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setEmptyCart } from "../redux/ProductSlice";
import { useState } from "react";

const Payment = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressRef = useRef("");
  const [payMode, setPayMode] = useState("");
  const user_Id = useSelector((state) => state.user?._id);
  const userIdIndex = cartProducts.findIndex(
    (cartProd) => cartProd.userId === user_Id
  );
  const totalQty = cartProducts[userIdIndex].userCartProducts
    .map(({ qty }) => qty)
    .reduce((curr, total) => (total += curr), 0);

  function subtotal(items) {
    return items
      .map(({ price, qty }) => price * qty)
      .reduce((sum, i) => sum + i, 0);
  }

  const invoiceTotal = subtotal(cartProducts[userIdIndex].userCartProducts);
  const StyledPaper = styled(Paper)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "500px",
  });

  const StyledBox = styled(Box)({
    width: "100%",
    backgroundColor: "#333333",
    color: "#fff",
    textAlign: "center",
    padding: 2,
  });

  const MyButton = styled(Button)({
    borderRadius: "5px",
    width: "99%",
    backgroundColor: "#E40145",
    color: "white",
    cursor: "pointer",
    margin: 2,
    ":hover": {
      backgroundColor: "#C5063C",
    },
  });

  return (
    <StyledPaper elevation={3}>
      <Stack direction="column" gap={4}>
        <Stack direction="column" gap={2}>
          <StyledBox>
            <Typography variant="h6"> Delivery Address</Typography>
          </StyledBox>
          <TextField
            required
            id="filled-multiline-static"
            label="Enter Address"
            multiline
            rows={4}
            variant="filled"
            sx={{ padding: 1 }}
            inputRef={addressRef}
          />
          <MyButton>Add Address</MyButton>
        </Stack>
        <Stack direction="column">
          <StyledBox>
            <Typography variant="h6">Payment Method</Typography>
          </StyledBox>
          <StyledBox
            sx={{ padding: 1, backgroundColor: "#F0F0F0", color: "black" }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "medium" }}
            >{`Total quantity: ${totalQty}`}</Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "medium" }}
            >{`Total amount: Rs. ${invoiceTotal}`}</Typography>
          </StyledBox>
          <Stack direction="row" sx={{ padding: 4 }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
            >
              <FormControlLabel
                value="gpay"
                control={<Radio />}
                sx={{ margin: 0 }}
              />
              <Tooltip title="GPay" placement="top">
                <Button>
                  <Box
                    component="img"
                    alt="Logo"
                    src={gpay}
                    sx={{
                      height: 20,
                      cursor: "pointer",
                    }}
                  />
                </Button>
              </Tooltip>

              <FormControlLabel
                value="phonepay"
                control={<Radio />}
                sx={{ margin: 0 }}
              />
              <Tooltip title="PhonePay" placement="top">
                <Button sx={{ "&:active": { bgcolor: "grey" } }}>
                  <Box
                    component="img"
                    alt="Logo"
                    src={phonepay}
                    sx={{ height: 20, cursor: "pointer" }}
                  />
                </Button>
              </Tooltip>
              <FormControlLabel
                value="paytm"
                control={<Radio />}
                sx={{ margin: 0 }}
              />
              <Tooltip title="Paytm" placement="top">
                <Button>
                  <Box
                    component="img"
                    alt="Logo"
                    src={paytm}
                    sx={{ height: 20 }}
                  />
                </Button>
              </Tooltip>
              <FormControlLabel
                value="cod"
                control={<Radio />}
                sx={{ margin: 0 }}
              />
              <Tooltip title="COD" placement="top">
                <Button>
                  <Box
                    component="img"
                    alt="Logo"
                    src={cod}
                    sx={{ height: 20 }}
                  />
                </Button>
              </Tooltip>
            </RadioGroup>
          </Stack>
          <MyButton
            onClick={() => {
              if (!addressRef.current.value || !payMode) {
                toast.error("All fields required");
              } else {
                toast.success("Order Placed Successfully!");
                dispatch(setEmptyCart());
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              }
            }}
          >
            Done
          </MyButton>
        </Stack>
      </Stack>
    </StyledPaper>
  );
};

export default Payment;
