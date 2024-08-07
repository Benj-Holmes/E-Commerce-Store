import React from 'react';
import './header.css';
import logo from '../../imgs/BillionLogo.png';
import cartLogo from '../../imgs/cartIcon.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartMenuSelector, toggleCart } from '../../slices/cartSlice';
import ShoppingCart from './shoppingCart/shoppingCart';
import { motion, AnimatePresence } from 'framer-motion';
import { cartItemSelector, tempCartSelector } from '../../slices/cartSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartMenuOpen = useSelector(cartMenuSelector);
    const cartItems = useSelector(cartItemSelector);
    const tempItems = useSelector(tempCartSelector);

    return (
        <div className='headerContainer'>
            <div className='logo' onClick={() =>navigate('/')}> 
                <img src={logo} alt='Site Logo, Click for Homepage' />
                <p> ONE<span>BILLION </span> </p>
            </div>
            <div className='midButtons'>
                <div className="clothing" onClick={()=>navigate("/products")}> PRODUCTS </div>
                <div className='Log In' onClick={() => navigate("/account")}> ACCOUNT </div>
                <div className='Checkout' onClick={() => navigate("/checkout")}> CHECKOUT </div>
            </div>
            <div className='cartButton' onClick={() => {dispatch(toggleCart())}}>
                <div className='cartQuantity'>
                    { cartItems.length > 0 || tempItems.length > 0 ? <p> {cartItems.length + tempItems.length} </p> : <p> 0 </p>} 
                </div> 
                <img src={cartLogo} alt='Open Shopping Cart' />
            </div>
            <AnimatePresence>
        {cartMenuOpen === true ? 
        <motion.div className='cartContainer' 
        animate={{ x: 0}} initial={{ x:550}} 
        transition={{type: 'tween', duration: 0.5}}
        exit={{ x:550 }}>
        <ShoppingCart /> 
        </motion.div>
        : '' }
        </AnimatePresence>
        </div>
    );
}

export default Header;
