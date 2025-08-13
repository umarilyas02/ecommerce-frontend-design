import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Deals_Section.css';
import {Link} from 'react-router-dom';

const Deals_Section = () => {
    
    const initialTargetTime = () => {
        
        const storedTime = localStorage.getItem('deals-timer-target');
        if (storedTime) {
            return parseInt(storedTime, 10);
        } else {
           
            const newTargetTime = Date.now() + (5 * 24 * 60 * 60 * 1000);
            localStorage.setItem('deals-timer-target', newTargetTime);
            return newTargetTime;
        }
    };
    
   
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [targetTime, setTargetTime] = useState(initialTargetTime);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products.json');
                const deals = response.data.filter(p => p.isDeal);
                setProducts(deals);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetTime - Date.now();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                //Reset of timer if it has expired
                const newTargetTime = Date.now() + (4 * 24 * 60 * 60 * 1000);
                localStorage.setItem('deals-timer-target', newTargetTime);
                setTargetTime(newTargetTime);
            }
        };

       
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetTime]); // Dependency on targetTime to rerun effect when it resets

    const formatTime = (time) => String(time).padStart(2, '0');

    return (
        <section className="deals_Section">
            <div className="deals-header">
                <div className="deals-title-container">
                    <h2 className="deals-title">Deals and offers</h2>
                    <p className="deals-subtitle">Hygiene equipments</p>
                </div>
                <div className="countdown-timer">
                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.days)}</span>
                        <span className="timer-label">Days</span>
                    </div>
                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.hours)}</span>
                        <span className="timer-label">Hour</span>
                    </div>
                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.minutes)}</span>
                        <span className="timer-label">Min</span>
                    </div>
                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.seconds)}</span>
                        <span className="timer-label">Sec</span>
                    </div>
                </div>
            </div>
            <div className="deals-products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-deal-card">
                  <Link to="products"><img src={product.image} alt={product.name} className="product-image" /></Link>      
                        <div className="product-info">
                            <p className="product-name">{product.name}</p>
                            <span className="product-discount">{product.discount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Deals_Section;