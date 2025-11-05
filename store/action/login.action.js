import { createAsyncThunk} from "@reduxjs/toolkit";
import axioshttp from "../../utils/axiosInterceptor"

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axioshttp.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
           localStorage.setItem("user", JSON.stringify(res.data.data));
            console.log(res.data.data)
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response.data || "Login failed, please try again"
            );
        }
    }
);