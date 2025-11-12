import { createAsyncThunk } from "@reduxjs/toolkit";
import axioshttp from "../../utils/axiosInterceptor";

// export const createPost = createAsyncThunk(
//   'posts/createPost',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axioshttp.post('/add-post', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },

//       });
//       console.log(response.data)
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Post Create Failed");
//     }
//   }
// );



export const createPost = createAsyncThunk("posts/create", async (formData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token"); // make sure token exists
    const res = await axios.post(
      "http://localhost:3000/api/post/add-post", // or your live API URL
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});


export const UserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId, thunkAPI) => {
    try {
      const res = await axioshttp.get(`/get-myposts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")
            }`
        },
      });
      console.log(res.data.data)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching posts"
      );
    }
  }
);


// export const getAllApprovedPosts= createAsyncThunk(
//   "posts/fetchgetAllApprovedPosts",
//   async (userId,status="approved", thunkAPI) => {

//     try {
//       const res = await axioshttp.get(`/get-allposts?status=${status}`, {
//         headers: { 
//             Authorization: `Bearer ${localStorage.getItem("token")
//         }` 
//     },
//       }); 
//       console.log(res.data.data)
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Error fetching posts"
//       );
//     }
//   }
// );

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axioshttp.put(`/update-post/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axioshttp.delete(`/delete-post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// export const getAllApprovedPosts = createAsyncThunk(
//   "posts/fetchAllApprovedPosts",
//   async (status, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axioshttp.get(`/getall-posts?status=${status}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(res.data.data);
//       return res.data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Error fetching posts"
//       );
//     }
//   }
// );


export const getAllApprovedPosts = createAsyncThunk(
  "posts/fetchAllApprovedPosts",
  async (status, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      
      const url = status
        ? `/getall-posts?status=${status}`
        : `/getall-posts`;

      const res = await axioshttp.get(url, {
        headers: {
          Authorization: `Bearer ${ token }`, 
        },
  });

console.log(res.data.data);
return res.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(
    error.response?.data?.message || "Error fetching posts"
  );
}
  }
);

export const approvePost = createAsyncThunk(
  "posts/approvePost",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axioshttp.put(
        `/approve-posts/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Approval failed");
    }
  }
);

export const rejectPost = createAsyncThunk(
  "posts/rejectPost",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axioshttp.put(
        `/reject-posts/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Rejection failed");
    }
  }
);

