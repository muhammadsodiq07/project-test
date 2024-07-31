import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Item {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItemsAsync = createAsyncThunk(
  "items/fetchItems",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  }
);

export const deleteItemAsync = createAsyncThunk(
  "items/deleteItem",
  async (id: number) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    return id;
  }
);

export const addProductAsync = createAsyncThunk(
  "items/addProduct",
  async (newProduct: Omit<Item, "id">) => {
    const response = await axios.post(
      "https://dummyjson.com/products/add",
      newProduct
    );
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "items/fetchProductById",
  async (id: number) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "items/updateProduct",
  async ({ id, ...updatedProduct }: { id: number } & Omit<Item, "id">) => {
    const response = await axios.put(
      `https://dummyjson.com/products/${id}`,
      updatedProduct
    );
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default itemsSlice.reducer;
