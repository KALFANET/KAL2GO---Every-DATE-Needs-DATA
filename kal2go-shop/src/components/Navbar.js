
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // קובץ CSS מותאם אישית

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">בית</Link>
        </li>
        <li>
          <Link to="/packages">חבילות</Link>
        </li>
        <li>
          <Link to="/purchase">רכישת חבילה</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;