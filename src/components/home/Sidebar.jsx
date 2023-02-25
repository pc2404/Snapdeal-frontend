import { ExpandLess, ExpandMore, MoreHoriz, Search } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory, setSearchTerm } from "../../redux/ProductSlice";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const getCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const allCategories = await response.json();
    console.log(allCategories);
    setCategories(allCategories);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Paper sx={{ width: "200px" }}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            CATEGORIES
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => dispatch(setCategory({ category: "All Products" }))}
        >
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="All Products" />
        </ListItemButton>
      </List>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            TOP CATEGORIES
          </ListSubheader>
        }
      >
        {categories.slice(0, 10).map((category) => {
          return (
            <ListItemButton
              onClick={() => {
                dispatch(setSearchTerm({ searchTerm: "" }));
                dispatch(setCategory({ category: category }));
              }}
            >
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          );
        })}
        <ListItemButton onClick={() => setOpen((prev) => !prev)}>
          <ListItemIcon>
            <MoreHoriz />
          </ListItemIcon>
          <ListItemText primary="More Categories" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {categories.slice(10).map((category) => {
          return (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    dispatch(setSearchTerm({ searchTerm: "" }));
                    dispatch(setCategory({ category: category }));
                  }}
                >
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                  <ListItemText primary={category} />
                </ListItemButton>
              </List>
            </Collapse>
          );
        })}
      </List>
    </Paper>
  );
};

export default Sidebar;
