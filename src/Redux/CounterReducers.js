import { createSlice } from "@reduxjs/toolkit";

let initialState = {count:0}
let counterslice = createSlice({
    name:'counterslice',
    initialState,
    reducers:
    {
        increase:(state)=>{
            state.count+=1;
        },

        decrease:(state)=>{
            state.count-=1;
        },

        incbyValue:(state,actions)=>{
            state.count+=actions.payload;
        },
    }
})

export let counterReducers = counterslice.reducer;
export let {increase, decrease, incbyValue} = counterslice.actions;
