import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../slices/authSlice';
import { cartItemSelector, checkoutCart } from '../../slices/cartSlice';

const PayButton = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemSelector);
    const user = useSelector(userSelector);

    return (
            <div className="paymentContainer">
                <button onClick={() => dispatch(checkoutCart({
                    cartItems,
                    userId: user.id
                }))}> Continue to Payment &#x2192; </button>
            </div>           
    );
}

export default PayButton;
