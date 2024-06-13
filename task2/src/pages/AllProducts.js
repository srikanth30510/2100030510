
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: '', company: '', minPrice: '', maxPrice: '' });

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts(filters.category, filters.company, filters.minPrice, filters.maxPrice);
            setProducts(data);
        };
        loadProducts();
    }, [filters]);

    return (
        <div>
            <FilterBar filters={filters} setFilters={setFilters} onApply={() => {}} />
            <div>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
