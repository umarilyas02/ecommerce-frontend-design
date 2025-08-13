import './Suppliers.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                // Axios will automatically handle parsing the JSON
                const response = await axios.get('/api/suppliers.json'); 
                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        fetchSuppliers();
    }, []);

  return (
    <section className='Suppliers'>
        <h2>Suppliers by region</h2>
            <div className="suppliers-grid">
                {suppliers.map((supplier, index) => (
                    <div className="supplier-card" key={index}>
                        <img src={supplier.flag} alt={`${supplier.country} flag`} className="flag-icon" />
                        <div className="supplier-info">
                            <p className="supplier-country">{supplier.country}</p>
                            <p className="supplier-domain">{supplier.domain}</p>
                        </div>
                    </div>
                ))}
            </div>
    </section>
  )
}

export default Suppliers