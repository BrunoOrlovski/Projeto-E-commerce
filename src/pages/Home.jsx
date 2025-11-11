import React from 'react';
import HeroBanner from '../components/HeroBanner';
import PolicyBar from '../components/PolicyBar';
import CategoryGrid from '../components/CategoryGrid';
import ProductSection from '../components/ProductSection';
import '../styles/home.css';
import { policies } from '../data';
import NewsletterSignup from '../components/NewsletterSignup';
import { useProducts } from '../Hooks/useProduct';
import { useFilteredProducts } from '../Hooks/useFilteredProducts';



function Home() {
    
    const {data: allProducts, loading, error} = useProducts();
    const { maisProcurados, lancamentos } = useFilteredProducts(allProducts);

    if (loading) {
        return <div className="loading-message">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="error-message">Erro ao carregar os produtos: {error.message}</div>;
    }
   
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