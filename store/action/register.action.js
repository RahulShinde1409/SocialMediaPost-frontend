import { createAsyncThunk } from '@reduxjs/toolkit';
import axioshttp from '../../utils/axiosInterceptor';

export const register = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axioshttp.post('/register', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);