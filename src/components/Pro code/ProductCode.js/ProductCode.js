import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../../fakeData';
import Product from '../../Product/Product';

const ProductCode = () => {
    const {productKey} = useParams();
    const product = fakeData.find(product => product.key === product.key);
    return (
        <div>
            <h1>This Product Details is under develop..</h1>
           <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductCode;