import { createSlice } from "@reduxjs/toolkit";

const cartDataReducer = createSlice({
    name: "cartData",
    initialState: {
        currentCartData: null,


    },
    reducers: {

        CartDataSuccess: (state, action) => {
            state.currentCartData = action.payload;
        }
    },
});

export const { CartDataStart, CartDataSuccess, CartDataFailure } = cartDataReducer.actions;
export default cartDataReducer.reducer;
