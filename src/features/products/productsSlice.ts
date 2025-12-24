import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface ProductsState {
  items: any[];
  categories: string[];
  loading: boolean;
  total: number;
  error?: string | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  loading: false,
  total: 0,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (params: { limit?: number; skip?: number; category?: string } = {}, { rejectWithValue }) => {
    try {
      const { limit = 12, skip = 0, category } = params;
      const url = category ? `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}` : `/products?limit=${limit}&skip=${skip}`;
      const res = await api.get(url);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCategories = createAsyncThunk('products/categories', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/products/categories');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any)?.message || 'Failed to load products';
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default productsSlice.reducer;
