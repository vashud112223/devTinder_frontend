import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addconnection: (state,action) =>{
          return action.payload;
        },
        removeconnection: (state,action) => {
            return null;
        }
    }
})

export const {addconnection,removeconnection} = connectionSlice.actions;
export default connectionSlice.reducer;