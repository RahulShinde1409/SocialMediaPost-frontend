import { createSlice} from '@reduxjs/toolkit';
import { register } from '../action/register.action';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    message:''
  },
  reducers: {
    resetAuth: (state) => {
      state.error = null;
      state.success = false;
      state.message ='';
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "Registering...";  
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.message = "Registered Successfully";  
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = "User Already Exists";  
      });
  }
});

export const { resetAuth } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
export default registerReducer;
