import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const [products, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect (() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existenceKeys => {
            const product = fakeData.find(pd => pd.key === existenceKeys);
            product.quantity = savedCart[existenceKeys];
            return product;
        })
        setCart(previousCart);
        }, [])
    
    const handleAddBtn = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;  
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key , count);
    }
    

  
    return (
        <div className='global-container'>
            <div className="product-container">
                    {
                        products.map(pd => <Product handleAddBtn ={handleAddBtn} product={pd}></Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'><button className="cart-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;