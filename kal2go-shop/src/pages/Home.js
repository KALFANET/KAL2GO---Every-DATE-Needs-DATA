import React from "react";
import { useNavigate } from "react-router-dom"; // יבוא useNavigate
import { FaGlobe, FaBolt, FaPiggyBank } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate(); // הגדרת הניווט

    const handleExplorePackages = () => {
        navigate("/packages"); // ניווט לעמוד חבילות
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <h1>ברוכים הבאים ל-KAL2GO</h1>
                <p>משלמות יעד לכל העולם עם כרטיסי eSIM.</p>
                <button className="cta-button" onClick={handleExplorePackages}>
                    גלה את החבילות
                </button>
            </section>

            <section className="features-section">
                <h2>למה לבחור בנו?</h2>
                <div className="features">
                    <div className="feature">
                        <FaGlobe size={50} color="#007bff" />
                        <h3>גלובלי</h3>
                        <p>כיסוי גלובלי לכל היעדים בעולם</p>
                    </div>
                    <div className="feature">
                        <FaBolt size={50} color="#007bff" />
                        <h3>מידי</h3>
                        <p>הפעלה מידית ללא המתנה</p>
                    </div>
                    <div className="feature">
                        <FaPiggyBank size={50} color="#007bff" />
                        <h3>חיסכון</h3>
                        <p>חיסכון בעלויות לעומת חבילות סלולר רגילות</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>© 2025 KAL2GO - כל הזכויות שמורות.</p>
            </footer>
        </div>
    );
};

export default Home;