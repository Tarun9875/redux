import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo / Site name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            My Shop
          </Button>
        </Typography>

        {/* Navigation links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            component={RouterLink}
            to="/products"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Products
          </Button>

          {/* Cart icon with badge */}
          <IconButton
            component={RouterLink}
            to="/cart"
            color="inherit"
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={totalCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
