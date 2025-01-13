import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL_CASH = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/packages`;

function PurchasePage() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // שליפת חבילות מה-Backend
    const fetchPackages = async () => {
      try {
        const response = await getPackages(); // getPackages מגיע מ-api.js
        setPackages(response.data);
       
      } catch (error) {
        console.error("Error fetching packages:", error);
        alert("Failed to load packages.");
      }
    };

    fetchPackages();
  }, []);

  const handlePurchase = async () => {
    if (!customerName || !selectedPackage) {
      alert("Please fill in all fields.");
      return;
    }

    const purchaseData = {
      customerName,
      packageId: selectedPackage,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/purchase",
        purchaseData
      );
      alert("Purchase successful!");
      console.log("Purchase response:", response.data);
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Purchase eSIM</h1>
      <form>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Select Package:
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
          >
            <option value="">Select</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - ${pkg.price}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handlePurchase}>
          Purchase
        </button>
      </form>
    </div>
  );
}

export default PurchasePage;