import React from "react";
import { Link } from "react-router-dom";
import '../styles/HeroBanner.css';

function HeroBanner() {
    return (
        <section className="hero-banner">
            <div className="hero-content">
                <h1 className="hero-title"># A CIDADE É SUA PISTA.</h1>
                <p className="hero-subtitle">Equipamentos e acessórios para você explorar cada km da sua jornada urbana</p>
                <Link to="/promocoes" className="hero-button">
                    CONHEÇA MAIS
                </Link>
            </div>
        </section>
    )    
}
export default HeroBanner;