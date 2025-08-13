import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getInitialState = (key, defaultValue) => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => getInitialState('cartItems', []));
    const [savedItems, setSavedItems] = useState(() => getInitialState('savedItems', []));

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }, [savedItems]);

    const addItemToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prevItems,
                {
                    ...product,
                    price: parseFloat(product.price) || 0, // ensure number
                    quantity: 1
                }
            ];
        });
    };

    const saveItemForLater = (product) => {
        setSavedItems(prevItems => {
            if (prevItems.find(item => item.id === product.id)) {
                return prevItems;
            }
            const { quantity, ...itemToSave } = product;
            return [...prevItems, itemToSave];
        });
    };

    const removeAllFromCart = () => setCartItems([]);

    const moveToCart = (itemToMove) => {
        setSavedItems(prevItems => prevItems.filter(item => item.id !== itemToMove.id));
        addItemToCart(itemToMove);
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const removeFromSaved = (itemId) => {
        setSavedItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.id === itemId && newQuantity > 0
                        ? { ...item, quantity: newQuantity }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const value = {
        savedItems,
        cartItems,
        addItemToCart,
        saveItemForLater,
        moveToCart,
        removeFromCart,
        removeFromSaved,
        updateQuantity,
        removeAllFromCart,
        itemCount: cartItems.reduce((total, item) => total + item.quantity, 0) // total qty
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
