import React, { useEffect, useState } from "react";
import { fetchPackages } from "../api/api";

function PurchasePage() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (err) {
        setError("Failed to fetch packages.");
      }
    };

    loadPackages();
  }, []);

  const handlePurchase = () => {
    if (!selectedPackage) {
      alert("Please select a package");
      return;
    }

    // הפעלת תשלום באמצעות Paddle
    const checkout = window.Paddle.Checkout.open({
      product: selectedPackage.paddleProductId,
      successCallback: () => alert("Payment successful!"),
      closeCallback: () => console.log("Payment window closed"),
    });
  };

  return (
    <div>
      <h1>Purchase eSIM</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <label>
          Select Package:
          <select
            onChange={(e) =>
              setSelectedPackage(packages.find((pkg) => pkg.packageCode === e.target.value))
            }
          >
            <option value="">Select</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.packageCode}>
                {pkg.name} - ${(pkg.price / 100).toFixed(2)}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handlePurchase}>
          Pay with Paddle
        </button>
      </form>
    </div>
  );
}

export default PurchasePage;