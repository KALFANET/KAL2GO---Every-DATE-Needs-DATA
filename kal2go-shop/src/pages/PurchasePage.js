import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PurchasePage.css';

function PurchasePage() {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/packages`);
                setPackages(response.data);
            } catch (err) {
                console.error('Error fetching packages:', err.message);
            }
        };

        fetchPackages();
    }, []);

    const handlePurchase = async () => {
        if (!selectedPackage || !email) {
            setError('Please select a package and provide a valid email.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase`, {
                productId: selectedPackage.id,
                price: selectedPackage.price,
                customerEmail: email,
            });

            if (response.data.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
            } else {
                setError('Failed to create payment link.');
            }
        } catch (err) {
            setError('Error processing payment. Please try again.');
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="purchase-container">
            <h1>Purchase eSIM</h1>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </label>
            <label>
                Select Package:
                <select
                    onChange={(e) => setSelectedPackage(JSON.parse(e.target.value))}
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select a package
                    </option>
                    {packages.map((pkg) => (
                        <option
                            key={pkg.packageCode}
                            value={JSON.stringify({
                                id: pkg.packageCode,
                                price: pkg.price / 10000 + 1.5,
                            })}
                        >
                            {pkg.name} - ${pkg.price / 10000 + 1.5}
                        </option>
                    ))}
                </select>
            </label>
            <button onClick={handlePurchase} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PurchasePage;