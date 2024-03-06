import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGN_IN_URL } from "../../../firebaseConfig";
import axios from "axios";

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (userData) => {
        try {
            const credentials = {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true
            };
            const response = await axios.post(SIGN_IN_URL, credentials);
            localStorage.setItem("token", response.data.idToken);
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLogin: false,
        message: null,
        error: null,
        modalIsOpen: false,
    },

    reducers: {
        logOut: (state) => {
            state.user = null;
            state.isLogin = false;
            localStorage.removeItem("token");
        },
        openModal: (state) => {
            state.modalIsOpen = true;
        },
        closeModal: (state) => {
            state.modalIsOpen = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
            state.modalIsOpen = false;
            state.message = "Connexion réussie";
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.error = action.payload;
            state.message = "Connexion échouée";
        });
    }

});

export const { setUser, logOut, openModal, closeModal } = authSlice.actions;

export default authSlice.reducer;