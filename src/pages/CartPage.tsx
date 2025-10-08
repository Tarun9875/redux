import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types";
import { removeFromCart, clearCart, updateQuantity } from "../redux/cartSlice";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🛒 Cart
      </Typography>

      {items.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
          <List>
            {items.map((i) => (
              <ListItem
                key={i.id}
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                {/* Product Image */}
                <Avatar
                  variant="square"
                  src={i.image}
                  alt={i.title}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />

                {/* Product Title */}
                <ListItemText primary={i.title} sx={{ flex: 1 }} />

                {/* Quantity Controls */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: i.id, quantity: i.quantity - 1 })
                      )
                    }
                    disabled={i.quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography sx={{ mx: 1 }}>{i.quantity}</Typography>

                  <IconButton
                    color="primary"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: i.id, quantity: i.quantity + 1 })
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Price */}
                <Typography sx={{ minWidth: 80 }}>₹{i.price * i.quantity}</Typography>

                {/* Remove Button */}
                <Button
                  color="error"
                  onClick={() => dispatch(removeFromCart(i.id))}
                  sx={{ ml: 2 }}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹{total}
          </Typography>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(clearCart())}
            sx={{ mt: 1 }}
          >
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
