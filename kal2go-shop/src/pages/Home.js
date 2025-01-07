import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate(); // הוספת פונקציית ניווט

    const handleExplorePackages = () => {
        navigate("/packages"); // ניווט לעמוד חבילות
    };

    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>ברוכים הבאים ל-KAL2GO</h1>
                <p>חבילות eSIM משתלמות לכל יעד בעולם.</p>
                <button className="cta-button" onClick={handleExplorePackages}>
                    גלה חבילות
                </button>
            </header>

            <section className="features-section">
                <h2>למה לבחור בנו?</h2>
                <div className="features">
                    <div className="feature">
                        <img src="/images/global.svg" alt="גלובלי" />
                        <p>כיסוי גלובלי</p>
                    </div>
                    <div className="feature">
                        <img src="/images/instant.svg" alt="מיידי" />
                        <p>הפעלה מיידית</p>
                    </div>
                    <div className="feature">
                        <img src="/images/saving.svg" alt="חיסכון" />
                        <p>חיסכון בעלויות נדידה</p>
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