import React from 'react';
import './shoppingCart.css';
import CartItem from './cartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleCart, cartItemSelector, getCartItems, tempCartSelector, addItemToCart, checkCart } from '../../../slices/cartSlice';
import { userSelector } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const cartItems = useSelector(cartItemSelector);
    const tempCartItems = useSelector(tempCartSelector);

    useEffect(() => {
        const addTempItemsToCart = () => {
        if(tempCartItems) {
            tempCartItems.map((tempItem) => {
                return dispatch(addItemToCart({
                    product_id: tempItem.id,
                    quantity: tempItem.quantity,
                    item_size: tempItem.size
                }))
            })
        }}

        if(user){
            dispatch(checkCart()).then(dispatch(getCartItems()).then(addTempItemsToCart))
        }
        
    }, [dispatch, user, tempCartItems])
    
    return (
            <div>
                <OutsideClickHandler onOutsideClick={() => dispatch(toggleCart())}>
                <div className="cartTop">
                    <p className='closeMenu' onClick={() => dispatch(toggleCart())}> &#x2716; </p>
                     <h1> Shopping Cart </h1>
                    { user === '' ? <div> 
                        <p className='logReminder'> 
                            Remember to Log In to save the items in your Cart!
                        </p> </div> : '' }
                     <div className="checkout">
                         <p onClick={() => navigate('/checkout')}> Proceed To Checkout &#x2192; </p>
                    </div>
                </div>
                 <div className="itemlist">
                    { cartItems !== null ? cartItems.map((item, index) => {
                        return <CartItem  key={index} product_id={item.product_id} cart_id={item.cart_id}
                        quantity={item.quantity} item_size={item.item_size} user_id={item.user_id}
                        name={item.name} description={item.description} price={item.price}
                        pic_path={item.pic_path} /> })
                    : '' }
                    { tempCartItems !== null ? tempCartItems.map((item, index) => {
                        return <CartItem  key={index} product_id={item.product_id} cart_id={item.cart_id}
                        quantity={item.quantity} item_size={item.item_size} user_id={item.user_id}
                        name={item.name} description={item.description} price={item.price}
                        pic_path={item.pic_path} /> })
                    : '' }
                </div>
                </OutsideClickHandler>
                </div>
    );
}

export default ShoppingCart;