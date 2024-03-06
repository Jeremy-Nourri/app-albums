import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_DB_URL } from "../../../firebaseConfig";
import axios from "axios";

const token = localStorage.getItem("token");

export const fetchAlbums = createAsyncThunk(
    "albums/fetchAlbums",
    async () => {
        try {
            const response = await axios.get(`${BASE_DB_URL}/albums.json?auth=${token}`);
            const data = Object.keys(response.data).map((key) => {
                return {
                    id: key,
                    ...response.data[key],
                    releaseDate: response.data[key].releaseDate.split("/").reverse().join("-")
                }
            });
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const addNewAlbum = createAsyncThunk(
    "albums/addNewAlbum",
    async (albumData) => {
        try {
            const response = await axios.post(`${BASE_DB_URL}/albums.json?auth=${token}`, albumData);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const updateAlbum = createAsyncThunk(
    "albums/updateAlbum",
    async (albumData) => {
        try {
            const response = await axios.put(`${BASE_DB_URL}/albums/${albumData.id}.json?auth=${token}`, albumData);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const deleteAlbum = createAsyncThunk(
    "albums/deleteAlbum",
    async (albumId) => {
        try {
            const response = await axios.delete(`${BASE_DB_URL}/albums/${albumId}.json?auth=${token}`);
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
    reducers: {
        setSelectedAlbum: (state, action) => {
            state.albumSelected = action.payload;
        }
    },

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


        builder.addCase(fetchAlbums.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            state.albums = action.payload;
            state.loading = false;
        }),
        builder.addCase(fetchAlbums.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(updateAlbum.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(updateAlbum.fulfilled, (state, action) => {
            const index = state.albums.findIndex(album => album.id === action.payload.id);
            state.albums[index] = action.payload;
            state.loading = false;
        }),
        builder.addCase(updateAlbum.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteAlbum.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(deleteAlbum.fulfilled, (state, action) => {
            state.albums = state.albums.filter(album => album.id !== action.payload);
            state.loading = false;
        }),
        builder.addCase(deleteAlbum.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { setSelectedAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;
