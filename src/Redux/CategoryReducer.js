import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getallcategory = createAsyncThunk('Categoryslice/getallcategory',
    async function () {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        return data.data;
    })

let initialState = { isLoading: false, isError: null, category: [] }

export let Categoryslice = createSlice({
    name: 'Categoryslice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getallcategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getallcategory.fulfilled, (state, actions) => {
            state.isLoading = false;
            state.category = actions.payload;
        })
        builder.addCase(getallcategory.rejected, (state, actions) => {
            state.isLoading = false;
            state.isError = actions.payload;
        })
    }
})

export let CategoryReducers = Categoryslice.reducer;


// extraReducers: {
//     [getallcategory.pending]: (state) => {
//         state.isLoading = true
//     },
//         [getallcategory.fulfilled]: (state, actions) => {
//             state.isLoading = false;
//             state.category = actions.payload;
//         },
//             [getallcategory.rejected]: (state,actions) => {
//                 state.isLoading = false;
//                 state.isError = actions.payload;
//             }
// }