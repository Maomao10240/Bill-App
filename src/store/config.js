import {configureStore} from "@reduxjs/toolkit";
import reducer from "./module/store";

const store = configureStore({
    reducer:{
        bill:reducer
    }
})
export default store