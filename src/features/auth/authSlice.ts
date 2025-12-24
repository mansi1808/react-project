import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('jwt_token'),
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/login', payload);
      return res.data; // contains token, etc.
    } catch (err: any) {
      // Try local registered users as fallback (for demo)
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const found = registered.find((u: any) => u.username === payload.username && payload.password === payload.password);
      if (found) {
        return { token: 'local_demo_token', ...found };
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: { username: string; password: string; firstName?: string; lastName?: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/users/add', payload);
      // store locally as well
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      registered.push(res.data);
      localStorage.setItem('registered_users', JSON.stringify(registered));
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('jwt_token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload; // dummyjson returns user object
      localStorage.setItem('jwt_token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any)?.message || 'Login failed';
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
