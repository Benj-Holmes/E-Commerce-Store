import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getProducts = createAsyncThunk(
    'product/getProducts',
    async () => {
        const response = await axios.get('https://e-commerce-store-backend-livid.vercel.app/api/product');
        return response.data;
    }
);

export const getReviews = createAsyncThunk(
    'products/getReviews',
    async (id) => {
        const response = await axios.get(`https://e-commerce-store-backend-livid.vercel.app/api/reviews/${id}`);
        return response.data;
    }
);

export const getRecommendations = createAsyncThunk(
    'products/getRecommendations',
    async () => {
        const response = await axios.get('https://e-commerce-store-backend-livid.vercel.app/api/product/discover');
        return response.data;
    }
);

const initialState = {
    products: [],
    filteredProducts: [],
    chosenProduct: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        pic_path: '',
        size: 'Small',
        quantity: 1
    },
    productRecs: [],
    chosenProductReviews: [],
    pageNo: 1,
    searchParam: 'All Products',
    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setChosenProduct(state, action) {
            state.chosenProduct.id = action.payload.id;
            state.chosenProduct.name = action.payload.name;
            state.chosenProduct.description = action.payload.description;
            state.chosenProduct.price = action.payload.price;
            state.chosenProduct.pic_path = action.payload.pic_path;
        },
        updateChosenSize(state, action) {
            state.chosenProduct.size = action.payload;
        },
        setSearchParam(state, action) {
            state.searchParam = action.payload;
            state.filteredProducts = [...state.products];
            switch(state.searchParam) {
                case 'All Products':
                    break;
                case 'Price: High to Low':
                    state.filteredProducts.sort((a, b) => (a.price.replace("£", "") > b.price.replace("£", "") ? -1 : 1));
                    break;
                case 'Price: Low to High':
                    state.filteredProducts.sort((a, b) => (a.price.replace("£", "") > b.price.replace("£", "") ? 1 : -1));
                    break;
                case 'Name: A-Z':
                    state.filteredProducts.sort((a, b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase())
                        return -1;
                        if(a.name.toLowerCase() > b.name.toLowerCase())
                        return 1;
                        return 0;
                    })
                    break;
                case 'Name: Z-A':
                    state.filteredProducts.sort((a, b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase())
                        return 1;
                        if(a.name.toLowerCase() > b.name.toLowerCase())
                        return -1;
                        return 0;
                    })
                    break;
                default:
                    state.filteredProducts = [...state.products];
            }
        
        
        
        }    
    }, extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.filteredProducts = action.payload;
                state.loading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecommendations.fulfilled, (state, action) => {
                state.productRecs = action.payload;
                state.loading = false;
            })
            .addCase(getRecommendations.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.chosenProductReviews = action.payload;
                state.loading = false;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const { setChosenProduct, updateChosenSize, setSearchParam } = productsSlice.actions;

export const productsSelector = state => state.products.filteredProducts;
export const recSelector = state => state.products.productRecs;
export const reviewSelector = state => state.products.chosenProductReviews;
export const chosenProductSelector = state => state.products.chosenProduct;
export const productsLoadingSelector = state => state.products.loading;

export default productsSlice.reducer;