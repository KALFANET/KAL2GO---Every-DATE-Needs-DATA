import React, { useEffect, useState } from "react";
import { fetchPackages } from "../api/api";

function PurchasePage() {
  const [packages, setPackages] = useState([]);
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

  return (
    <div>
      <h1>Purchase eSIM</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <label>
          Select Package:
          <select>
            <option value="">Select</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.packageCode}>
                {pkg.name} - ${pkg.price / 100}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
}

export default PurchasePage;