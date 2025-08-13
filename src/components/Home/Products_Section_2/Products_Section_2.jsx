import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products_Section_2.css'; // New CSS file for this section

import bg from '../../../assets/electronics-bg.png' // You'll need to create or import your own background image

const Products_Section_2 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products.json');
                // Filter immediately for "Consumer electronics and gadgets" products
                const electronicsProducts = response.data.filter(p => p.category === 'Consumer electronics and gadgets');
                setProducts(electronicsProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const electronicsTopListings = products.filter(p => p.isTopListing);
    const electronicsOtherItems = products.filter(p => !p.isTopListing);

    return (
        <>
            <section className='Products_Section_2'>
                <div className="category-header-banner" style={{ backgroundImage: `url(${bg})` }}>
                    <div className="header-content">
                        <h2>Consumer<br />electronics and<br />gadgets</h2>
                        <button>Source now</button>
                    </div>
                </div>
                <div className="category-products-grid">
                    <div className="top-listings">
                        {electronicsTopListings.map(product => (
                            <div key={product.id} className="product-listing-card">
                                <div className="listing-info">
                                    <p className="listing-name">{product.name}</p>
                                    <p className="listing-price">From USD {product.price}</p>
                                </div>
                                <img src={product.image} alt={product.name} />
                            </div>
                        ))}
                    </div>
                    <div className="other-items">
                        {electronicsOtherItems.map(product => (
                            <div key={product.id} className="product-listing-card">
                                <div className="listing-info">
                                    <p className="listing-name">{product.name}</p>
                                    <p className="listing-price">From USD {product.price}</p>
                                </div>
                                <img src={product.image} alt={product.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products_Section_2;