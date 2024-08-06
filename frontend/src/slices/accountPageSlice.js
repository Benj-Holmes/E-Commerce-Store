import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
    'accountPage/createOrder',
    async () => {
        const response = await axios.post(`http://localhost:4000/api/order`, {}, {withCredentials: true});
        return response.data;
    }
)

export const getMembersOrders = createAsyncThunk(
    'accountPage/getMembersOrders',
    async () => {
        const response = await axios.get('http://localhost:4000/api/order', {withCredentials: true});
        return response.data;
    }
)

export const getOrderItems = createAsyncThunk(
    'accountPage/getOrderItems',
    async (order_id) => {
        const response = await axios.get(`http://localhost:4000/api/order/${order_id}`);
        return response.data;
    }

)

const initialState = {
    membersOrders: [],
    membersOrderItems: [],
    chosenOrderId: null,
    menu: 'Log In',
    loading: false,
    error: null
}

const accountPageSlice = createSlice({
    name: 'accountPage',
    initialState,
    reducers: {
        changeMenu(state, action) {
            state.menu = action.payload;
        },
        setChosenOrder(state, action) {
            state.chosenOrderId = action.payload;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getMembersOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembersOrders.fulfilled, (state, action) => {
                state.membersOrders = action.payload;
                state.loading = false;
            })
            .addCase(getMembersOrders.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getOrderItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderItems.fulfilled, (state, action) => {
                state.loading = false;
                state.membersOrderItems = action.payload.map(item => ({
                    itemName: item.name,
                    itemPrice: item.priceInt,
                    itemQuantity: item.quantity,
                    itemSize: item.item_size,
                    picPath: item.picture_path
                }));
            })
            .addCase(getOrderItems.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const { changeMenu, setChosenOrder } = accountPageSlice.actions;

export const menuSelector = state => state.accountPage.menu;
export const membersOrdersSelector = state => state.accountPage.membersOrders;
export const chosenOrderSelector = state => state.accountPage.chosenOrderId;
export const orderItemSelector = state => state.accountPage.membersOrderItems;

export default accountPageSlice.reducer;