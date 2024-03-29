import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';
const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
    console.log(props.product)
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4>
                <p>by {seller}</p>
                <p>Price: ${price} only</p>
                <p>Only {stock} left in stock - order soon!!</p>
                 <button className='cart-btn' onClick={() => props.handleAddBtn(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;
