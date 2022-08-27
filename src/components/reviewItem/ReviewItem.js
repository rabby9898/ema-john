import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItem={
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItem} className="review-item">   
            <h5 className="product-name">{name}</h5>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <br />
            <button onClick ={() => props.removeCart(key)} className="cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;