import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Packages.css";

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/packages") // בקשת ה-API לחבילות
            .then(response => setPackages(response.data))
            .catch(error => console.error("Error fetching packages:", error));
    }, []);

    return (
        <div className="packages-container">
            <h1>חבילות eSIM זמינות</h1>
            <div className="packages-list">
                {packages.map((pkg) => (
                    <div className="package-card" key={pkg.id}>
                        <h2>{pkg.name}</h2>
                        <p>{pkg.description}</p>
                        <p><strong>מחיר:</strong> ${pkg.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;