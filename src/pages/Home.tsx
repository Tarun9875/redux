import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      p={2}
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Store 🏪
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Browse our products and find your favorites!
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
