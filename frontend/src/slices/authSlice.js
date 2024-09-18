import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data) => {
        const response = await axios.post('https://e-commerce-store-backend-livid.vercel.app/api/user/register', {
            first_name: data.fname,
            last_name: data.lname,
            email: data.email,
            password: data.password
        }, {withCredentials: true})
        return response.data;
    }
)

export const logInUser = createAsyncThunk(
    'auth/logInUser',
    async (data) => {
        const response = await axios.post('https://e-commerce-store-backend-livid.vercel.app/auth/login', {
            email: data.email,
            password: data.password
        }, { withCredentials: true });
        return response.data;
    }
)    
    
//This thunk is called to see if the member is logged in, so we can decide what to render on some pages
export const getUser = createAsyncThunk(
    'auth/getUser',
    async() => {
        const response = await axios.get('https://e-commerce-store-backend-livid.vercel.app/api/user',
        {withCredentials: true,
        headers: {'Access-Control-Allow-Origin': 'https://e-commerce-store-backend-livid.vercel.app'}
        });
        return response.data;
       
    }
)

export const logOutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        const response = axios.get("https://e-commerce-store-backend-livid.vercel.app/auth/logout", 
        { withCredentials: true });
        return (await response).data;
    }
)

const initialState = {
    logPw: '',
    logEmail: '',
    register: {
        fname: '',
        lname: '',
        email: '',
        pword: '',
        confirmPword: '',
    },
    registerMsg: '',
    user: {},
    isAuthenticated: false,
    error: null,
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateLogInPassword(state, action) {
            state.logPw = action.payload;
        },
        updateLogInEmail(state, action) {
            state.logEmail = action.payload
        },
        updateRegisterFname(state, action) {
            state.register.fname = action.payload;
        },
        updateRegisterLname(state, action) {
            state.register.lname = action.payload;
        },
        updateRegisterEmail(state, action) {
            state.register.email = action.payload;
        },
        updateRegisterPword(state, action) {
            state.register.pword = action.payload;
        },
        updateRegisterConfirmPword(state, action) {
            state.register.confirmPword = action.payload;
        },
        manageAuthMenu(state, action) {
            state.menuState = action.payload;
        }
       
    }, extraReducers: (builder) => {
        builder
            .addCase(logInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.logPw = '';
                state.logEmail = '';
                if (state.user.id) {
                    state.isAuthenticated = true;
                }
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                if (state.user.id) {
                    state.isAuthenticated = true;
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerMsg = action.payload;
                state.loading = false;
                state.register = {
                    fname: '',
                    lname: '',
                    email: '',
                    pword: '',
                    confirmPword: ''
                };
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(logOutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = {};
                state.loading = false;
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

// Action Creators
export const { updateLogInPassword, 
    updateLogInEmail, 
    updateRegisterFname, 
    updateRegisterLname,
    updateRegisterEmail,
    updateRegisterPword,
    updateRegisterConfirmPword,
    manageAuthMenu
} = authSlice.actions;

//Login Selectors
export const logEmailSelector = state => state.auth.logEmail;
export const logPwSelector = state => state.auth.logPw;

//Registration Selectors
export const registerFnameSelector = state => state.auth.register.fname;
export const registerLnameSelector = state => state.auth.register.lname;
export const registerEmailSelector = state => state.auth.register.email;
export const registerPwordSelector = state => state.auth.register.pword;
export const registerConfirmPwordSelector = state => state.auth.register.confirmPword;

//Once Authorised Selectors
export const userSelector = state => state.auth.user;
export const authenticationSelector = state => state.auth.isAuthenticated;

//Menu Selector
export const menuSelector = state => state.auth.menuState;
export const registerMsgSelector = state => state.auth.registerMsg;

export default authSlice.reducer;