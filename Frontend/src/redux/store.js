import { configureStore } from "@reduxjs/toolkit"
import authSliceReducers from "./slices/authSlice.js"
const store = configureStore({
    reducer : {
        auth : authSliceReducers,
    },
    devTools : true,
}) ;

export default store;