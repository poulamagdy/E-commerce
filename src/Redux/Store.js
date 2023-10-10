import { configureStore } from "@reduxjs/toolkit"
import { counterReducers } from "./CounterReducers"
import { CategoryReducers } from "./CategoryReducer"

export let Store = configureStore({
    reducer:
    {
        counter: counterReducers,
        categorys: CategoryReducers
    }
})