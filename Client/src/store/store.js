import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"

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
    user: userReducer
})

const persist_reducer = persistReducer(persistConfig, combinedReducers)

const store = configureStore({
    // register
    reducer: {
        reducer: persist_reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;

