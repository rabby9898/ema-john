
import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    // const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if(total> 500){
        shipping = 0;
    }
    else{
        shipping = 4.99;
    }
    const tax = total / 8;

    const allTotal = (total + shipping + tax);
    const formatNum = num =>{
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${formatNum(total)}</p>
            <p>Shipping Cost: ${shipping}</p>
            <p>Tax + VAT: ${formatNum(tax)}</p>
            <p>Total Price: ${formatNum(allTotal)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;