import React from 'react';
import './header.css';
import logo from '../../imgs/BillionLogo.png';
import cartLogo from '../../imgs/cartIcon.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

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
            <div className='cartButton'> {/* onClick={() => {dispatch(toggleCart())}}  */}
                <img src={cartLogo} alt='Open Shopping Cart' />
            </div>

        </div>
    );
}

export default Header;
