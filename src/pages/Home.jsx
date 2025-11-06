import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import PolicyBar from '../components/PolicyBar';
import CategoryGrid from '../components/CategoryGrid';
import ProductSection from '../components/ProductSection';
import '../styles/home.css';
import { policies } from '../data';
import NewsletterSignup from '../components/NewsletterSignup';

function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      
        fetch('/produtos.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAllProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
                console.error("Erro ao carregar produtos:", err);
            });
    }, []); 

    if (loading) {
        return <div className="loading-message">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="error-message">Erro ao carregar os produtos: {error.message}</div>;
    }

    const filteredMaisProcurados = allProducts.filter(p => p.tags && p.tags.includes('Mais Vendido'));
    const filteredLancamentos = allProducts.filter(p => p.tags && p.tags.includes('Lançamento'));

    const countMaisProcurados = Math.floor(filteredMaisProcurados.length / 4) * 4;
    const countLancamentos = Math.floor(filteredLancamentos.length / 4) * 4;

    const maisProcurados = filteredMaisProcurados.slice(0, countMaisProcurados);
    const lancamentos = filteredLancamentos.slice(0, countLancamentos);

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