import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_DB_URL } from "../../../firebaseConfig";
import axios from "axios";

export const addNewAlbum = createAsyncThunk(
    "albums/addNewAlbum",
    async (albumData) => {
        try {
            const response = await axios.post(`${BASE_DB_URL}/albums.json`, albumData);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

const albumsSlice = createSlice({
    name: "albums",
    initialState: {
        albums: [],
        loading: false,
        error: null,
        albumSelected: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(addNewAlbum.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(addNewAlbum.fulfilled, (state, action) => {
            state.albums.push(action.payload);
            state.loading = false;
        }),
        builder.addCase(addNewAlbum.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default albumsSlice.reducer;
