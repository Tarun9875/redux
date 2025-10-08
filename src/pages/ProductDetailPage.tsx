import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProductById, Product } from "../api/productApi";
import { addToCart, CartItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Box, Card, CardMedia, CardContent, Typography, CircularProgress, Button } from "@mui/material";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { data: product, isLoading, isError, error } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography color="error" align="center" mt={5}>
        {error?.message || "Failed to load product"}
      </Typography>
    );

  if (!product) return <Typography align="center">No product found</Typography>;

  const cartItem: CartItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
    image: product.images?.[0] || "/placeholder.png",
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 400 }}>
        {product.images && product.images.length > 0 && (
          <CardMedia component="img" height="300" image={product.images[0]} alt={product.title} />
        )}
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Category: {product.category} | Brand: {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Rating: {product.rating} ⭐ | Stock: {product.stock}
          </Typography>

          <Button variant="contained" color="primary" onClick={() => dispatch(addToCart(cartItem))}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetailPage;
