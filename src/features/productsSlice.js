
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Backend API address
const API_URL = 'http://localhost:3000/api/products';

// Fetch products from MongoDB through Express
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // Build the image path for each product
      return data.map(product => ({
        ...product,
        id: product._id,
        image: `${import.meta.env.BASE_URL}${product.image}`
      }));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Products initial state
const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;
