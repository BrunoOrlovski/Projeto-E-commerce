import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Breadcrumbs.css'; 

function Breadcrumbs({ produto }) {
    
    const location = useLocation(); 

    const items = useMemo(() => {
        const path = location.pathname;

        if (produto) {
            return [
                { label: "Home", path: "/" },
                { label: produto.category, path: `/categoria/${produto.category}` },
                { label: produto.name, path: null } 
            ];
        }
        
        if (path === '/ShoppCart') {
            return [
                { label: "Home", path: "/" },
                { label: "Carrinho", path: null }
            ];
        }
        
       /*  if (path === '/login' || path === '/register') {
             return [
                { label: "Home", path: "/" },
                { label: "Login / Cadastro", path: null }
            ];
        }
 */
        return []; 

    }, [location, produto]); 

    if (!items || items.length === 0 || location.pathname === '/') {
        return null; 
    }

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs-nav">
            <ol className="breadcrumbs-list">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumbs-item">
                        {index < items.length - 1 && item.path ? (
                            <Link to={item.path} className="breadcrumbs-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="breadcrumbs-current">
                                {item.label}
                            </span>
                        )}
                        {index < items.length - 1 && (
                            <span className="breadcrumbs-separator"> &gt; </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;