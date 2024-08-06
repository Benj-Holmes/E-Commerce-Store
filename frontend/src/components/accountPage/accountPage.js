import React from 'react';
import OrderHistory from './orderHistory/orderHistory';
import LogIn from '../login/login';
import { userSelector, getUser } from '../../slices/authSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const AccountPage = () => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])


    return (
        <div>
            { user.id ? 
            <OrderHistory />
            :
            <LogIn /> 
            }
        </div>
    );
}

export default AccountPage;
