import { createAsyncThunk } from "@reduxjs/toolkit";
import axioshttp from "../../utils/axiosInterceptor";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("📤 Sending login request:", { email, password });

      const res = await axioshttp.post("/login", { email, password }, {
        withCredentials: true, 
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      return res.data;
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Login failed, please try again");
    }
  }
);
