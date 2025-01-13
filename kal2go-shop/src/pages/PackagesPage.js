import React, { useEffect, useState } from "react";
import { fetchPackages } from "../api/api";
import "../styles/PackagesPage.css";

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadPackages = async () => {
            const data = await fetchPackages();
            setPackages(data);
        };
        loadPackages();
    }, []);

    const calculatePrice = (price) => {
        const basePrice = price / 10000; // המרה לדולרים
        const fee = 0.30; // עמלה
        return (basePrice + fee).toFixed(2);
    };

    const filteredPackages = packages.filter(
        (pkg) =>
            pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="packages-container">
            <h1>Available Packages</h1>
            <input
                type="text"
                placeholder="Search by Name or Region"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Data</th>
                        <th>Duration</th>
                        <th>Speed</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPackages.map((pkg) => (
                        <tr key={pkg.packageCode}>
                            <td>{pkg.name}</td>
                            <td>${calculatePrice(pkg.price)}</td>
                            <td>{(pkg.volume / 1048576).toFixed(2)} GB</td>
                            <td>
                                {pkg.duration} {pkg.durationUnit}
                            </td>
                            <td>{pkg.speed}</td>
                            <td>{pkg.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PackagesPage;