import React, { useState } from "react";
import {
  AppBar,
  Box,
  styled,
  Toolbar,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Stack,
  Badge,
} from "@mui/material";

import {
  ShoppingCartOutlined,
  AccountCircle,
  PersonOutline,
  ViewInAr,
  FavoriteBorder,
  Search,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory, setLogout, setSearchTerm } from "../redux/ProductSlice";
import { useRef } from "react";
import snapdeallogo from "../assets/SnapDeal_logo_logotype.png";
import snapdealicon from "../assets/Snapdeal_Logo_new.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const searchTermRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const cartProducts = useSelector((state) => state.cartProducts);
  const user = useSelector((state) => state.user);
  const fullName = token ? `${user.firstName} ${user.lastName}` : "SIGN IN";
  const user_Id = useSelector((state) => state.user?._id);
  const userIdIndex = cartProducts.findIndex(
    (cartProd) => cartProd.userId === user_Id
  );

  const totalQty =
    token && userIdIndex !== -1
      ? cartProducts[userIdIndex].userCartProducts
          .map(({ qty }) => qty)
          .reduce((curr, total) => (total += curr), 0)
      : 0;

  console.log(token);

  function handleExpand() {
    setOpen((prev) => !prev);
  }

  const StyledToolbar = styled(Toolbar)({
    backgroundColor: "#E40145",
    display: "flex",
    justifyContent: "space-between",
  });

  const SearchBar = styled("div")({
    backgroundColor: "#eceff1",
    padding: "0 10px",
    color: "black",
    width: "50%",
    height: "40px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
  });

  const MyButton = styled(Button)({
    borderRadius: "5px",
    width: "120px",
    backgroundColor: "#E40145",
    color: "white",
    cursor: "pointer",
  });

  const topNavArray = [
    "Impact@Snapdeal",
    "Gift Cards",
    "Help Center",
    "Sell On Snapdeal",
    "Download App",
  ];

  const Item = styled(Box)({
    padding: "10px",
    textAlign: "center",
    color: "white",
  });
  return (
    <Box>
      <Box px={6} bgcolor="#C6053C">
        <Stack direction="row" justifyContent="space-between">
          <Item sx={{ display: { xs: "none", md: "block" } }}>
            Brand Waali Quality, Bazaar Waali Deal!
          </Item>

          <Stack direction="row">
            {topNavArray.map((item) => {
              return <Item>{item}</Item>;
            })}
          </Stack>
        </Stack>
      </Box>
      <AppBar position="sticky">
        <StyledToolbar>
          <Box
            component="img"
            alt="Logo"
            src={snapdeallogo}
            sx={{
              height: 30,
              display: { xs: "none", md: "block" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />

          <Box
            component="img"
            alt="Logo"
            src={snapdealicon}
            sx={{
              height: 30,
              display: { xs: "block", md: "none" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />

          {/* ----search---- */}
          <SearchBar>
            <InputBase
              placeholder="Search products & brands"
              sx={{ width: "100%" }}
              inputRef={searchTermRef}
            />
            <MyButton
              startIcon={<Search />}
              sx={{ backgroundColor: "#333333" }}
              onClick={() =>
                dispatch(
                  setSearchTerm({ searchTerm: searchTermRef.current.value })
                )
              }
            >
              Search
            </MyButton>
          </SearchBar>
          {/* ----login---- */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <MyButton variant="text" onClick={() => navigate("/cart")}>
              Cart
              <Badge badgeContent={totalQty} color="default" sx={{ margin: 1 }}>
                <ShoppingCartOutlined />
              </Badge>
            </MyButton>
            <MyButton
              endIcon={<AccountCircle />}
              variant="text"
              onClick={handleExpand}
            >
              {fullName}
            </MyButton>
          </Stack>
          <AccountCircle
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleExpand}
          />
        </StyledToolbar>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={4}>
                <PersonOutline />
                Your Account
              </Stack>
            </Stack>
          </MenuItem>

          <MenuItem>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={2}>
                <ViewInAr />
                Your Orders
              </Stack>
            </Stack>
          </MenuItem>
          <MenuItem>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={2}>
                <FavoriteBorder />
                Shortlist
              </Stack>
            </Stack>
          </MenuItem>
          <hr />
          <MenuItem>
            <Stack direction="column">
              <Item sx={{ color: "black" }}>If you are a new user </Item>
              <Item sx={{ color: "black" }}>Register </Item>
            </Stack>
          </MenuItem>
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {token ? (
              <MyButton
                variant="contained"
                onClick={() => {
                  dispatch(setLogout());
                  dispatch(setCategory({ category: "All Products" }));
                  navigate("/");
                }}
                sx={{ ":hover": { backgroundColor: "#333333" } }}
              >
                Logout
              </MyButton>
            ) : (
              <MyButton
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{ ":hover": { backgroundColor: "#333333" } }}
              >
                Login
              </MyButton>
            )}
          </MenuItem>
        </Menu>
      </AppBar>
    </Box>
  );
};

export default Navbar;
