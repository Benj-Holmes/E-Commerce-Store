import React from 'react';
import './sortBy.css';
import { useDispatch } from 'react-redux';
import { setSearchParam } from '../../../slices/productsSlice';

const SortBy = () => {
    const dispatch = useDispatch();
    return (
        <div className='sortByContainer'>
            
                <label for="lang">Sort By</label>
                <select name="sortBy" id="sortBy" onChange={(e) => dispatch(setSearchParam(e.target.value))}>
                    <option value="All Products">All Products</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Name: A-Z">Name: A - Z</option>
                    <option value="Name: Z-A">Name: Z - A</option>
                </select>
        </div>
    );
}

export default SortBy;
