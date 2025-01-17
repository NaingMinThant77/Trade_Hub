import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"

import loaderReducer from "./slices/loaderSlice"

// npm i redux-persist
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const combinedReducers = combineReducers({
    // register
    user: userReducer,
    loader: loaderReducer
})

const persist_reducer = persistReducer(persistConfig, combinedReducers)

const store = configureStore({
    reducer: {
        reducer: persist_reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;

