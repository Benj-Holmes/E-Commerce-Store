import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../slices/authSlice';
import { createOrder } from '../../slices/accountPageSlice';
import { setCartToInactive } from '../../slices/cartSlice';

const CheckoutSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(createOrder());
        dispatch(setCartToInactive());
        
    });

    return (
        <div className='successBox'>
            <h1> Your Checkout was Succesful! </h1>
            <p> Thank you for your business, we hope that you found everything you were looking for
                on our Site. If you have any feedback, please don't hesitate to get in touch, our contact
                details can be found in the Footer of our website.
            </p> 
        </div>
    );
}

export default CheckoutSuccess;
