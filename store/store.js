import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/login.slice";
import registerReducer from "./slice/register.slice";
import createPostReducer from "./slice/createpost.Slice";



const store = configureStore({
    reducer : {
      
       login:loginReducer,
       register:registerReducer,
       posts:createPostReducer
    }
})
export default store;