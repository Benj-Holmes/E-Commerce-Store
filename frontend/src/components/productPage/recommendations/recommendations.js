import React from 'react';
import './recommendations.css';
import { useEffect } from 'react';
import RecCard from './recCard';
import { useDispatch,  useSelector } from 'react-redux'; 
import { getRecommendations, recSelector } from '../../../slices/productsSlice';

const Recommendations = (props) => {
    const dispatch = useDispatch();
    const recommendations = useSelector(recSelector);
    
    
    useEffect(() => {
        dispatch(getRecommendations());
    }, [dispatch]);

    return (
        <div className='recommendationsContainer'>
                <h2> Discover More Items </h2> 
            <div className="productList">
                { recommendations != null ? recommendations.map((body, index) => 
                    <RecCard setProduct={props.setProduct}
                    key={index} name={body.name}
                    description={body.description} price={body.price}
                    path={body.picture_path} id={body.id} />) : '' }
            </div>   
        </div>
    );
}

export default Recommendations;
