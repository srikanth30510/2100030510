
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(productId);
                console.log('Fetched product data:', data); // Log the data
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        loadProduct();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
        </div>
    );
};

export default ProductDetails;
