import React, { useState, useEffect } from "react";
import { getPackages, syncPackages } from "../api/api";

function PackagesPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // שליפת החבילות בעת טעינת העמוד
    useEffect(() => {
        const loadPackages = async () => {
            try {
                setLoading(true);
                const packagesData = await fetchPackages();
                setPackages(packagesData);
            } catch (err) {
                setError("Failed to fetch packages.");
            } finally {
                setLoading(false);
            }
        };

        loadPackages();
    }, []);

    // תפעול סנכרון חבילות
    const handleSyncPackages = async () => {
        try {
            setLoading(true);
            await syncPackages();
            const packagesData = await getPackages(); // שליפת החבילות שוב לאחר סנכרון
            setPackages(packagesData);
            alert("Packages synced successfully.");
        } catch (err) {
            setError("Failed to sync packages.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Available Packages</h1>
            <button onClick={handleSyncPackages}>Sync Packages</button>
            <ul>
                {packages.map((pkg) => (
                    <li key={pkg.id}>
                        <h3>{pkg.name}</h3>
                        <p>{pkg.description}</p>
                        <p>Price: ${pkg.price.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PackagesPage;