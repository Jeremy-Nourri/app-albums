import { configureStore } from "@reduxjs/toolkit";
import albumsSlice from "./components/features/Albums/albumsSlice";

const store = configureStore({
    reducer: {
        albums: albumsSlice
    }
})

export default store;