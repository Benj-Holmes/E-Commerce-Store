import React from 'react';
import CheckoutItem from './checkoutItem';
import './checkout.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../slices/authSlice';
import { cartItemSelector, checkCart, getCartItems } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import PayButton from './payButton';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const cartItems = useSelector(cartItemSelector);

    useEffect(() => {
        if(user){
            dispatch(checkCart(user.id)).then(dispatch(getCartItems(user.id)))
        }
    }, [dispatch, user]);

    return (
        <div className='checkoutContainer'>
            { user.id === undefined ?
            <div>
                <div className='infoContainer'> 
                    <div className='headerHolder'>
                        <h1> Please Log in <br /> before you check out </h1>
                    </div>
                </div>
                <p className='logLink' onClick={() => navigate('/account')}> Click Here to go to the Login Page </p> 
            </div>
            : 
            <div>
                <h1> Your Shopping Cart </h1>
                <div className='infoContainer2'>
                    <div className="itemlist2">
                        { cartItems !== null ? cartItems.map((item, index) => {
                        return <CheckoutItem key={index} product_id={item.product_id} cart_id={item.cart_id}
                        quantity={item.quantity} item_size={item.item_size} user_id={item.user_id}
                        name={item.name} description={item.description} price={item.price} 
                        pic_path={item.pic_path} /> })
                        : '' }
                    </div>
                </div>
                    <div >
                        <PayButton />
                    </div>
            </div>
            }
        </div> 
    );
}

export default Checkout;
