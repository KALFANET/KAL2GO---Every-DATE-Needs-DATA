import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Product.css";

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // הוספת פונקציית ניווט
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/packages/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error("Error fetching product:", error));
    }, [id]);

    const handleBuyNow = () => {
        navigate("/checkout", { state: { product } }); // מעבר לעמוד Checkout
    };

    if (!product) return <p className="loading">טוען...</p>;

    return (
        <div className="product-container">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p><strong>מחיר:</strong> ${product.price}</p>
            <button className="buy-button" onClick={handleBuyNow}>רכש עכשיו</button>
        </div>
    );
};

export default Product;