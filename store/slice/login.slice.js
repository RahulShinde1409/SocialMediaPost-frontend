import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../action/login.action";

const loginSlice = createSlice({
  name: "login",
  initialState: {
   isLogged: localStorage.getItem("user") ? true : false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLogged= false;
      localStorage.removeItem("token");
    },
  },
extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "Logging..";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.successMessage = "Logged in successfully";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = "Logged failed";
      });
//  .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


//        .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
 },
});

export const { logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
export default loginReducer;

