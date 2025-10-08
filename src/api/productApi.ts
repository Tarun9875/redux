import axiosClient from "./axiosClient";
import store from "../redux/store";

// ✅ Define Product interface (matches DummyJSON API structure)
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// ✅ Redux store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Fetch paginated products (limit + skip)
export const fetchProducts = async (limit: number, skip: number): Promise<Product[]> => {
  try {
    const response = await axiosClient.get("/products", {
      params: { limit, skip },
    });

    // API response = { products: Product[], total, skip, limit }
    const products = response.data?.products ?? [];
    return products.map((p: any): Product => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      brand: p.brand,
      category: p.category,
      thumbnail: p.thumbnail,
      images: p.images,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    throw new Error("Unable to load products. Please try again later.");
  }
};

// ✅ Fetch single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    const p = response.data;

    // Ensure consistent structure
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      brand: p.brand,
      category: p.category,
      thumbnail: p.thumbnail,
      images: p.images,
    };
  } catch (error) {
    console.error(`❌ Failed to fetch product with ID ${id}:`, error);
    throw new Error("Unable to load product details. Please try again later.");
  }
};
