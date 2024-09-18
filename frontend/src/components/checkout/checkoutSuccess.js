import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../slices/authSlice';
import { createOrder } from '../../slices/accountPageSlice';
import { setCartToInactive } from '../../slices/cartSlice';
import logo from '../../imgs/BillionLogo.png';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
        dispatch(createOrder());
        dispatch(setCartToInactive());
        
        const reDirect = setTimeout(() => {
            navigate('/');
        }, 10000)

        return () => clearTimeout(reDirect);
    });

    return (
        <>
        <div className='successBox'>
            <img src={'/display/AccountBackground.png'} />
            <h1> Your Checkout was Succesful! </h1>
        </div>
        <div className='successText'>
            <p> Thank you for your business, we hope that you found everything you were looking for
                on our Site. If you have any feedback, please don't hesitate to get in touch, our contact
                details can be found in the Footer below.
            </p> 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img src={logo} className='successLogo'/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <p> You will be Redirected to the Home Page in 10 Seconds.</p>
        </div>
        </>
    );
}

export default CheckoutSuccess;
