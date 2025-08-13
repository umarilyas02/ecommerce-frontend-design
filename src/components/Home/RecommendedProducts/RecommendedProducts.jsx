import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecommendedProducts.css';

const RecommendedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Adjust the path to your JSON file as needed
                const response = await axios.get('/api/recommended-products.json');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="recommended-products-container">
            <h2 className="recommended-products-title">Recommended items</h2>
            <div className="recommended-products-grid">
                {products.map(product => (
                    <div key={product.id} className="recommended-product-card">
                        <img src={product.image} alt={product.name} className="recommended-product-image" />
                        <div className="recommended-product-info">
                            <p className="recommended-product-price">${product.price}</p>
                            <p className="recommended-product-name">{product.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedProducts;
