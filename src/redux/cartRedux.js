import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,

    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
          },
        removeFromCart: (state, action) => {
        const productId = action.payload;
        const removedProduct = state.products.find(
            (product) => product._id === productId
        );
        if (removedProduct) {
            state.quantity -= removedProduct.quantity;
            state.total -= removedProduct.price * removedProduct.quantity;
            state.products = state.products.filter(
            (product) => product._id !== productId
            );
        }
    }
}})

export const {addProduct, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;