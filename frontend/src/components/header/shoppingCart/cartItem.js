import React from 'react';
import './shoppingCart.css';
import { userSelector } from '../../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromTempCart, setProdIdForDeletion, deleteItemFromCart, getCartItems } from '../../../slices/cartSlice';

const CartItem = (props) => {
    const imgPath = `/productImages/${props.pic_path}.jpg`;
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    const handleDelete = () => {
        if (user) {
            dispatch(setProdIdForDeletion(props.product_id));
            dispatch(deleteItemFromCart(props.product_id)).then(() => dispatch(getCartItems()));
        } else {
            dispatch(removeFromTempCart(props.name));
        }
    }

    return (
        <div className='cartItem'>
            <p className='deleteItem' onClick={handleDelete}> &#x2716; </p>
            <div className='details'>
                <h3> {props.name} </h3>
                <div className='pDetails'>
                    <p> Price {props.price} </p>
                    
                    <p> Quantity {props.quantity} </p>
                </div>
            </div>
            <img src={imgPath} alt=''></img>
        </div>
    );
}

export default CartItem;
