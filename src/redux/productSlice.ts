import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById, Product } from "../api/productApi";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// ✅ Async thunks
export const getProducts = createAsyncThunk<Product[], { limit: number; skip: number }>(
  "products/getProducts",
  async ({ limit, skip }) => {
    return await fetchProducts(limit, skip);
  }
);

export const getProductById = createAsyncThunk<Product, number>(
  "products/getProductById",
  async (id) => {
    return await fetchProductById(id);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // All products
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });

    // Single product
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

export default productSlice.reducer;
