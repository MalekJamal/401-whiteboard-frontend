import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    posts: [],
    status: "idle", //idle, loading, succeeded, failed
    error: null
};


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_SERVER}/post`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async(initialPost)=>{
    initialPost.userID = Number(JSON.parse(localStorage.getItem("currentUser")).id);
   const { data } = await axios
      .post(`${process.env.REACT_APP_SERVER}/post`, initialPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data)
      return data;

});
    
export const updatePost = createAsyncThunk("posts/updateNePost", async(initialPost)=>{

    const { postID } =initialPost;

    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_SERVER}/post/${postID}`,initialPost,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          return data;
    } catch (error) {
        console.log(error);
    }
});

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action)=>{
            state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action)=>{
            state.status = "succeeded";
            const loadedPosts = action.payload.map(post=>{
                return post;
            });
            state.posts = state.posts.concat(loadedPosts);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }).addCase(addNewPost.fulfilled, (state, action) => {
            const sortedPosts = state.posts.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
            console.log(sortedPosts)
            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
            // End fix for fake API post IDs 
            console.log(action.payload);
            state.posts.push(action.payload);
        }).addCase(updatePost.fulfilled, (state, action)=>{
            if(! action.payload?.postID){
                console.log("Update could not complete");
                console.log(action.payload);
                return;
            }

            const { postID } = action.payload;
            const posts = state.posts.filter(post=> post.id !== postID);
            state.posts = [...posts, action.payload];
        })
    }
});


export const selectAllPosts = (state)=> state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postID) =>
    state.posts.posts.find(post => post.id === postID);

export default postSlice.reducer;