
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import PolicyBar from '../components/PolicyBar';
import CategoryGrid from '../components/CategoryGrid';
import ProductSection from '../components/ProductSection';
import '../styles/home.css';
import { policies, maisProcurados, lancamentos } from '../data';
import NewsletterSignup from '../components/NewsletterSignup';

function Home() {
    return (
        <div className="home-container">
            <header>
                <HeroBanner />
            </header>

            <PolicyBar policies={policies} />

            <main>
                <ProductSection 
                    title="OS MAIS PROCURADOS" 
                    products={maisProcurados} 
                />

                <CategoryGrid />
                
                <ProductSection 
                    title="LANÇAMENTOS" 
                    products={lancamentos} 
                />

                <NewsletterSignup/>
            </main>
        </div>
    );
}

export default Home;