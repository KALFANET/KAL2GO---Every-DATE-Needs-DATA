import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// עיצוב העמוד
const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

const ProductList = styled.ul`
    list-style: none;
    padding: 0;
`;

const ProductItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    &:last-child {
        border-bottom: none;
    }
`;

const Total = styled.h3`
    text-align: right;
    margin-top: 20px;
    color: #333;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // משיכת המוצרים מהעגלה
        const fetchCart = async () => {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(storedCart);

            // חישוב המחיר הכולל
            const total = storedCart.reduce((sum, item) => sum + item.price, 0);
            setTotalPrice(total);
        };

        fetchCart();
    }, []);

    const handlePayment = async () => {
        setError(""); // איפוס שגיאות

        try {
            // קריאה ל-API של Paddle
            const response = await axios.post("http://localhost:3000/api/checkout", {
                cart,
                totalPrice,
            });

            console.log("Payment successful:", response.data);

            // מעבר לעמוד תודה
            navigate("/thank-you");
        } catch (error) {
            console.error("Payment failed:", error);
            setError("Failed to process the payment. Please try again.");
        }
    };

    return (
        <Container>
            <Title>Checkout</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ProductList>
                {cart.map((item) => (
                    <ProductItem key={item.id}>
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                    </ProductItem>
                ))}
            </ProductList>
            <Total>Total: ${totalPrice.toFixed(2)}</Total>
            <Button onClick={handlePayment}>Complete Payment</Button>
        </Container>
    );
};

export default Checkout;