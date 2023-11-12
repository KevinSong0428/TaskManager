import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./reducers/taskSlice"

const store = configureStore({
    reducer: {
        tasks: taskReducer,
    }
});

// RootState represents entire state of redux store 
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export default store;