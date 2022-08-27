import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../reviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import './Review.css';
import { useNavigate} from 'react-router-dom';


const Review = () => {
    const [cart, setCart] = useState([]);
    const removeCart  = (productKey) => {
       const newCarts = cart.filter(pd => pd.key !== productKey);
       setCart(newCarts);
       removeFromDatabaseCart(productKey);
    }
    const [orderPlace, setOrderPlace] = useState(false);
    const navigate = useNavigate();
    const handleProceedCheck = () => {
        navigate("/login");
    }

    let thankyou;
    if(orderPlace){
        thankyou = <img className="imgH" src={happyImage} alt=""></img>
    }

    useEffect (() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const showCart = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(showCart);
    }, []);
    return (
        <div className="global-container">
           <div className="product-container">
           {
                    cart.map(pd => <ReviewItem 
                    removeCart = {removeCart}
                    product={pd}></ReviewItem>) 
            }
           </div>

           {thankyou}

           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheck} className='cart-btn'>Proceed Checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;