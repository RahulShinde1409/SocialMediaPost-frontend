import { createSlice } from "@reduxjs/toolkit";
import { createPost, UserPosts, updatePost, deletePost, getAllApprovedPosts, approvePost, rejectPost } from "../action/createpost.action";

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(UserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllApprovedPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllApprovedPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(getAllApprovedPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p._id !== action.payload);
            })
            .addCase(approvePost.fulfilled, (state, action) => {
                // remove from pending list
                state.items = state.items.filter(post => post._id !== action.payload._id);
            })
            .addCase(rejectPost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post._id !== action.payload._id);
            });

    },
});

export const createPostreducer = postSlice.reducer;
export default createPostreducer;