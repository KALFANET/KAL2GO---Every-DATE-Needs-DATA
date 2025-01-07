import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    if (cart.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <Link to="/checkout">Proceed to Checkout</Link>
        </div>
    );
};

export default Cart;