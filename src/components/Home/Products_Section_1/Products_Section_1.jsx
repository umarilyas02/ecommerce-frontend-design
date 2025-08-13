import './Products_Section_1.css'
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import bg from '../../../assets/Homedecor-bg.png'


const Products_Section_1 = () => {
  const [products, setProducts] = useState([]);
 
     useEffect(() => {
         const fetchProducts = async () => {
             try {
                 const response = await axios.get('/api/products.json');
                 // Filter immediately for "Home and outdoor" products
                 const homeProducts = response.data.filter(p => p.category === 'Home and outdoor');
                 setProducts(homeProducts);
             } catch (error) {
                 console.error("Error fetching products:", error);
             }
         };
         fetchProducts();
     }, []);
 
     const homeTopListings = products.filter(p => p.isTopListing);
     const homeOtherItems = products.filter(p => !p.isTopListing);
   return (
     <>
     <section className='Products_Section_1'>
       <div className="category-header-banner" style={{ backgroundImage: `url(${bg})` }}>
                 <div className="header-content">
                     <h2>Home and <br />outdoor</h2>
                     <button>Source now</button>
                 </div>
             </div>
             <div className="category-products-grid">
                
                 <div className="top-listings">
                     {homeTopListings.map(product => (
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
                     {homeOtherItems.map(product => (
                         <div key={product.id} className="product-listing-card">
                             <div className="listing-info">
                                 <p className="listing-name">{product.name}</p>
                                 <p className="listing-price">From USD {product.price}</p>
                             </div>
                             <img src={product.image} alt={product.name}
                             style={
                                 { height: '8.2rem', width: '8.2rem', objectFit: 'contain' }
                             } />
                         </div>
                     ))}
                 </div>
             </div>
     </section>
 
     </>
   )
}

export default Products_Section_1