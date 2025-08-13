import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './Products.css';

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list');
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        brands: [],
        features: [],
        condition: null,
        rating: 0,
        minPrice: null,
        maxPrice: null
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products_category.json');
                setAllProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Effect to handle filtering when products or selectedFilters change
    useEffect(() => {
        let currentFilteredProducts = [...allProducts];
        
        // Filter by category
        if (selectedFilters.categories.length > 0) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                selectedFilters.categories.includes(product.category)
            );
        }

        // Filter by brand
        if (selectedFilters.brands.length > 0) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                selectedFilters.brands.includes(product.brand)
            );
        }

        // Filter by features
        if (selectedFilters.features.length > 0) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                selectedFilters.features.every(filterFeature => 
                    product.features.includes(filterFeature)
                )
            );
        }

        // Filter by condition
        if (selectedFilters.condition) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                product.condition === selectedFilters.condition
            );
        }

        // Filter by rating
        if (selectedFilters.rating > 0) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                Math.floor(product.rating) >= selectedFilters.rating
            );
        }

        // Filter by price range
        if (selectedFilters.minPrice !== null) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                parseFloat(product.price) >= selectedFilters.minPrice
            );
        }
        if (selectedFilters.maxPrice !== null) {
            currentFilteredProducts = currentFilteredProducts.filter(product =>
                parseFloat(product.price) <= selectedFilters.maxPrice
            );
        }

        setFilteredProducts(currentFilteredProducts);
    }, [allProducts, selectedFilters]);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prevFilters => {
            const currentList = prevFilters[filterType];
            if (Array.isArray(currentList)) {
                if (currentList.includes(value)) {
                    return {
                        ...prevFilters,
                        [filterType]: currentList.filter(item => item !== value)
                    };
                } else {
                    return {
                        ...prevFilters,
                        [filterType]: [...currentList, value]
                    };
                }
            } else {
                return {
                    ...prevFilters,
                    [filterType]: value
                };
            }
        });
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [name]: value === "" ? null : parseFloat(value)
        }));
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const handleRemoveFilter = (filterType, value) => {
        setSelectedFilters(prevFilters => {
            if (Array.isArray(prevFilters[filterType])) {
                return {
                    ...prevFilters,
                    [filterType]: prevFilters[filterType].filter(item => item !== value)
                };
            } else {
                return {
                    ...prevFilters,
                    [filterType]: null
                };
            }
        });
    };

    const handleClearAllFilters = () => {
        setSelectedFilters({
            categories: [],
            brands: [],
            features: [],
            condition: null,
            rating: 0,
            minPrice: null,
            maxPrice: null
        });
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star filled">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
        }
        return stars;
    };

    if (loading) {
        return <div className="category-page-container">Loading products...</div>;
    }

    // Extract unique filter options from all products
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    const uniqueBrands = [...new Set(allProducts.map(p => p.brand))];
    const uniqueFeatures = [...new Set(allProducts.flatMap(p => p.features))];
    const uniqueRatings = [5, 4, 3, 2];
    const uniqueConditions = [...new Set(allProducts.map(p => p.condition))];

    return (
        <section className="category-page-container">
            <header className="breadcrumb">
                <p>
                    Home &gt; Clothing &gt; Men’s wear &gt; Summer clothing
                </p>
            </header>
            <div className="content-layout">
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h4 className="filter-title">Category</h4>
                        <ul className="filter-list">
                            {uniqueCategories.map(category => (
                                <li key={category}>
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.categories.includes(category)}
                                        onChange={() => handleFilterChange('categories', category)}
                                    /> {category}
                                </li>
                            ))}
                            <li className="see-all">See all</li>
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Brands</h4>
                        <ul className="filter-list">
                            {uniqueBrands.map(brand => (
                                <li key={brand}>
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.brands.includes(brand)}
                                        onChange={() => handleFilterChange('brands', brand)}
                                    /> {brand}
                                </li>
                            ))}
                            <li className="see-all">See all</li>
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Features</h4>
                        <ul className="filter-list">
                            {uniqueFeatures.map(feature => (
                                <li key={feature}>
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.features.includes(feature)}
                                        onChange={() => handleFilterChange('features', feature)}
                                    /> {feature}
                                </li>
                            ))}
                            <li className="see-all">See all</li>
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Price range</h4>
                        <div className="price-input">
                            <input
                                type="number"
                                placeholder="Min"
                                name="minPrice"
                                value={selectedFilters.minPrice === null ? '' : selectedFilters.minPrice}
                                onChange={handlePriceChange}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                name="maxPrice"
                                value={selectedFilters.maxPrice === null ? '' : selectedFilters.maxPrice}
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Condition</h4>
                        <ul className="filter-list">
                            <li>
                                <input
                                    type="radio"
                                    name="condition"
                                    checked={selectedFilters.condition === null}
                                    onChange={() => handleFilterChange('condition', null)}
                                /> Any
                            </li>
                            {uniqueConditions.map(condition => (
                                <li key={condition}>
                                    <input
                                        type="radio"
                                        name="condition"
                                        checked={selectedFilters.condition === condition}
                                        onChange={() => handleFilterChange('condition', condition)}
                                    /> {condition}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-title">Ratings</h4>
                        <ul className="filter-list rating-list">
                            {uniqueRatings.map(rating => (
                                <li key={rating}>
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.rating === rating}
                                        onChange={() => handleFilterChange('rating', selectedFilters.rating === rating ? 0 : rating)}
                                    />
                                    <span className="stars-filter">
                                        {'★'.repeat(rating)}
                                        {'☆'.repeat(5 - rating)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="product-list-main">
                    <div className="product-list-header">
                        <span className="product-count">{filteredProducts.length} items in <strong>Mobile accessory</strong></span>
                        <div className="header-actions">
                            <label className="verified-only"><input type="checkbox" /> Verified only</label>
                            <select className="featured-select">
                                <option>Featured</option>
                            </select>
                            <div className="view-mode-buttons">
                                <button className={`view-button ${viewMode === 'list' ? 'active' : ''}`} onClick={() => handleViewModeChange('list')}>☰</button>
                                <button className={`view-button ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => handleViewModeChange('grid')}>❏</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Active Filters Section */}
                    <div className="active-filters">
                        {(Object.values(selectedFilters).some(filter => (Array.isArray(filter) && filter.length > 0) || (typeof filter === 'number' && filter > 0) || (filter !== null && !Array.isArray(filter)))) && (
                            <>
                                <span className="active-filters-label">Applied Filters:</span>
                                {selectedFilters.categories.map(cat => (
                                    <span key={cat} className="filter-tag">
                                        Category: {cat}
                                        <button onClick={() => handleRemoveFilter('categories', cat)}>x</button>
                                    </span>
                                ))}
                                {selectedFilters.brands.map(brand => (
                                    <span key={brand} className="filter-tag">
                                        Brand: {brand}
                                        <button onClick={() => handleRemoveFilter('brands', brand)}>x</button>
                                    </span>
                                ))}
                                {selectedFilters.features.map(feat => (
                                    <span key={feat} className="filter-tag">
                                        Feature: {feat}
                                        <button onClick={() => handleRemoveFilter('features', feat)}>x</button>
                                    </span>
                                ))}
                                {selectedFilters.condition && (
                                    <span className="filter-tag">
                                        Condition: {selectedFilters.condition}
                                        <button onClick={() => handleRemoveFilter('condition', null)}>x</button>
                                    </span>
                                )}
                                {selectedFilters.rating > 0 && (
                                    <span className="filter-tag">
                                        Rating: {selectedFilters.rating}★ & up
                                        <button onClick={() => handleRemoveFilter('rating', 0)}>x</button>
                                    </span>
                                )}
                                {selectedFilters.minPrice !== null && (
                                    <span className="filter-tag">
                                        Min Price: ${selectedFilters.minPrice}
                                        <button onClick={() => handleRemoveFilter('minPrice', null)}>x</button>
                                    </span>
                                )}
                                {selectedFilters.maxPrice !== null && (
                                    <span className="filter-tag">
                                        Max Price: ${selectedFilters.maxPrice}
                                        <button onClick={() => handleRemoveFilter('maxPrice', null)}>x</button>
                                    </span>
                                )}
                                <button className="clear-all-button" onClick={handleClearAllFilters}>Clear All</button>
                            </>
                        )}
                    </div>
                    
                    <div className={`product-list ${viewMode === 'grid' ? 'product-list-grid' : ''}`}>
                        {filteredProducts.map(product => (
                            // Use a Link component instead of a div for navigation
                            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                
                                <div className="product-image-container">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                </div>
                                <div className="product-details-container">
                                    <h5 className="product-name">{product.name}</h5>
                                    <div className="product-price-row">
                                        <p className="product-price">${product.price}</p>
                                        {product.oldPrice && <p className="product-old-price">${product.oldPrice}</p>}
                                    </div>
                                    <div className="product-rating-row">
                                        <div className="product-stars">
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className="product-orders">{product.rating} · {product.orders} orders</span>
                                        <span className="product-shipping">{product.shipping}</span>
                                    </div>
                                    <p className="product-details">{product.details}</p>
                                    <span className="view-details-link">View details</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="pagination">
                        <span className="pagination-info">Show 1D</span>
                        <div className="pagination-controls">
                            <a href="#" className="page-link">&lt;</a>
                            <a href="#" className="page-link active">1</a>
                            <a href="#" className="page-link">2</a>
                            <a href="#" className="page-link">3</a>
                            <a href="#" className="page-link">4</a>
                            <a href="#" className="page-link">&gt;</a>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Products;
