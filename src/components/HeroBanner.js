import React from "react";
import { Link } from "react-router-dom";
import '../styles/HeroBanner.css';

function HeroBanner() {
    return (
        <section className="hero-banner">
            
            <div className="hero-content-left">
                <h1 className="hero-title-slogan"># A CIDADE É SUA PISTA.</h1>
                <p className="hero-subtitle">Equipamentos e acessórios para você explorar cada km da sua jornada urbana</p>
            </div>

            <div className="hero-content-right">
                <h1 className="hero-title-promo">BLACK WEEK</h1>
                <p className="hero-subtitle-promo">
                    Produtos com até <span className="discount-value-hero-banner">80% OFF</span>
                </p>
                <Link to="/promocoes" className="hero-button">
                    VER PROMOÇÕES
                </Link>
            </div>
        </section>
    )    
}
export default HeroBanner;