import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import HomePage from "./pages/Home";
import PackagesPage from "./pages/PackagesPage";
import PurchasePage from "./pages/PurchasePage"; // תיקון הנתיב כאן

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;