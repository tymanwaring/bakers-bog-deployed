import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        //ADD DELETE
        changeTotal: (state, action) => {
            state.total = state.total - action.payload
        },
        deleteProduct: (state, action) => {
            console.log(action.payload)
            state.products = state.products.filter(item => item._id !== action.payload)
            console.log(action.payload)
            state.quantity -= 1
            // state.products = state.products.filter(item => item.id !== id)
        },
        addProduct: (state, action) => {
            // if (state.products.find(element => element.id == action.payload.id))
            var val = Math.floor(1000 + Math.random() * 9000);
            action.payload._id = action.payload._id.slice(0, -4) + val
            state.products.push(action.payload)
            state.quantity += 1
            state.total += action.payload.price * action.payload.quantity
        },
        reset: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const { addProduct, deleteProduct, changeTotal, reset } = cartSlice.actions
export default cartSlice.reducer