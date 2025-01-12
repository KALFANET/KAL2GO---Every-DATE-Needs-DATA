import React, { useEffect, useState } from "react";
import axios from "axios";

function PackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/api/esim/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h1>eSIM Packages</h1>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id}>
            {pkg.name} - ${pkg.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PackagesPage;