import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Thunk which checks if Cart exists, and if not, creates one.
export const checkCart = createAsyncThunk(
    'cart/createCart',
    async() => {
        const response = await axios.get(`http://localhost:4000/api/cart`, {withCredentials: true});
        return response.data;
    }
)


export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async() => {
        const response = await axios.get(`http://localhost:4000/api/cart/items`, {withCredentials: true});
        return response.data;
    }
)

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async(data) => {
        const response = await axios.post(`http://localhost:4000/api/cart`, {
            product_id: data.product_id,
            quantity: data.quantity,
            item_size: data.item_size
        }, {withCredentials: true});
        return response.data;
    }
)

// Results in req.user being undefined
export const deleteItemFromCart = createAsyncThunk(
    'cart/deleteItemFromCart',
    async(prodId) => {
        const response = await axios.delete(`http://localhost:4000/api/cart/${prodId}`, 
        {withCredentials: true});
        return response.data;
    }
)

export const checkoutCart = createAsyncThunk(
    'cart/checkoutCart',
    async(data) => {
        const response = await axios.post('http://localhost:4000/api/payment/create-checkout-session', {
            cartItems: data.cartItems,
        }, {withCredentials: true}).then((res) => {
            if(res.data.url) {
                window.location.href = res.data.url;
            } 
        }).catch((err) => console.log(err.message));
        return response.data;
    }
)

export const setCartToInactive = createAsyncThunk(
    'cart/setCartToInactive',
    async() => {
        const response = await axios.put(`http://localhost:4000/api/cart`, {}, {withCredentials: true});
        return response.data;
    }
)

export const updateCartQuantity = createAsyncThunk(
    'cart/incrementCartQuantity',
    async (data) => {
        console.log(data);
        const response = await axios.put('http://localhost:4000/api/cart/increment', {
            cart_id: data.cart_id,
            product_id: data.product_id,
            quantity: data.quantity
        }, {withCredentials: true});
        return response.data;
    }
)

const initialState = {
    cartItems: [],
    tempCartItems: [],
    priceTotal: 0,
    cartOpen: false,
    cartId: 0,
    cartMsg: '',
    prodIdForDeletion: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart (state) {
            state.cartOpen = !state.cartOpen;
        },
        addToTempCart (state, action) {
            if(state.tempCartItems.filter((e) => e.name === action.payload.name).length > 0) {
                state.cartMsg = 'This Item was Already found in Your Cart and was not Added Again';
            } else {
            state.tempCartItems.push(action.payload);
            state.cartMsg = "Item was Successfully Added to Your Cart";
            }
        },
        removeFromTempCart (state, action) {
            const filteredCart = state.tempCartItems.filter(item => item.name !== action.payload);
            state.tempCartItems = filteredCart;    
        },
        clearCartMsg (state) {
            state.cartMsg = '';
        },
        setCartMsg (state, action) {
            state.cartMsg = action.payload;
        },
        clearCart (state) {
            state.cartItems = [];
        },
        setProdIdForDeletion(state, action) {
            state.prodIdForDeletion = action.payload;
        }

    }, extraReducers: (builder) => {
        builder
            .addCase(checkCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkCart.fulfilled, (state, action) => {
                state.cartId = action.payload;
                state.loading = false;
            })
            .addCase(checkCart.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload.map(cartItem => ({
                    product_id: cartItem.product_id,
                    cart_id: cartItem.cart_id,
                    quantity: cartItem.quantity,
                    item_size: cartItem.item_size,
                    user_id: cartItem.user_id,
                    name: cartItem.name,
                    description: cartItem.description,
                    price: cartItem.price,
                    pic_path: cartItem.picture_path,
                    priceInt: cartItem.priceInt
                }));
                state.loading = false;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.cartMsg = action.payload;
                state.loading = false;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(checkoutCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutCart.fulfilled, (state) => {
                state.cartMsg = 'Cart Checkout Success!';
                state.loading = false;
            })
            .addCase(checkoutCart.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(setCartToInactive.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setCartToInactive.fulfilled, (state, action) => {
                state.cartMsg = action.payload;
                state.loading = false;
            })
            .addCase(setCartToInactive.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItemFromCart.fulfilled, (state) => {
                state.prodIdForDeletion = null;
                state.loading = false;
            })
            .addCase(deleteItemFromCart.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const { toggleCart,
    clearCartMsg,
    addToTempCart,
    setCartMsg,
    removeFromTempCart,
    clearCart,
    setProdIdForDeletion } = cartSlice.actions;

export const cartMenuSelector = state => state.cart.cartOpen;
export const cartItemSelector = state => state.cart.cartItems;
export const tempCartSelector = state => state.cart.tempCartItems;
export const cartMsgSelector = state => state.cart.cartMsg;

export default cartSlice.reducer;