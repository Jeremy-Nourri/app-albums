import { configureStore } from "@reduxjs/toolkit";
import albumsSlice from "./components/features/Albums/albumsSlice";
import authSlice from "./components/features/Auth/authSlice";

const store = configureStore({
    reducer: {
        albums: albumsSlice,
        auth: authSlice
    }
})

export default store;