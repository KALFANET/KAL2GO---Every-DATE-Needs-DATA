import React, { useState } from "react";

function PurchasePage() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [customerName, setCustomerName] = useState("");

  const handlePurchase = () => {
    console.log("Purchased:", selectedPackage, "by", customerName);
    alert("Purchase successful!");
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
            <option value="Package 1">Package 1</option>
            <option value="Package 2">Package 2</option>
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