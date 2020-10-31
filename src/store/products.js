import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name:'product',
    initialState : {
        products : [
        ]
    },
    reducers: {
        setProducts(state, action) {
            // console.log("in add state!! ");
            state.products = action.payload.results || action.payload.result
        },
        updateInStock(state, action) {
             state.products.forEach(product => {
                 if(product._id == action.payload){
                     product.inStock--;
                    //  return product
                 }
                });
            return state
        }
    }
});

export const { setProducts, updateInStock } = productSlice.actions;

export default productSlice.reducer;
