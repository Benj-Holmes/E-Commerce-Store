import React from 'react';
import './orderHistory.css';
import OrderCard from './orderCard';
import { useEffect } from 'react';
import { userSelector, logOutUser } from '../../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../../slices/cartSlice';
import { getMembersOrders, membersOrdersSelector } from '../../../slices/accountPageSlice';

const OrderHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const orders = useSelector(membersOrdersSelector);

    useEffect(() => {
        dispatch(getMembersOrders());
    }, [dispatch])

    const handleLogOut = () => {
        dispatch(logOutUser());
        dispatch(clearCart());
    }

    return (
        <div className='accountContainer'>
            <div className="accButtons">
                <h5 onClick={handleLogOut}> &#x2190; Log Out  </h5>
                <h1> Welcome to Your Account { user.first_name ? <span> {user.first_name} </span> : '' } </h1>
                <h5 onClick={() => navigate('/checkout')}> Checkout &#x2192; </h5>
            </div>
            <h3> Your Previous Orders</h3>
            <div className='listTitles'>
                <p className='OID'> Order ID </p>
                <p className='DOC'> Date of Completion </p>
                <p> </p>
                <p className='EOD'> Expand Order Details </p>
            </div>
            <div className="orderHistory">
                { orders != null ? orders.map((order, index) => 
                    <OrderCard key={index} cart_id={order.cart_id} 
                    date={order.completed_at} order_id={order.id} />
                    ) : ''
                }
            </div>
        </div>
    );
}

export default OrderHistory;