import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../api/productApi";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box } from "@mui/material";

const ProductPage: React.FC = () => {
  const { data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products", { limit: 10, skip: 0 }],
    queryFn: () => fetchProducts(10, 0),
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
        {error?.message || "Failed to load products"}
      </Typography>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={3}>
        {products?.map((p: Product) => (
          <Grid
            key={p.id}
            sx={{
              flex: "1 0 21%",
              minWidth: 250,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {p.thumbnail && (
                <CardMedia component="img" height="200" image={p.thumbnail} alt={p.title} />
              )}
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  component={RouterLink}
                  to={`/products/${p.id}`}
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {p.title}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: "bold", mt: 1 }}>
                  ₹{p.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductPage;
