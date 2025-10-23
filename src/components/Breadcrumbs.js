
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Breadcrumbs.css'; 

function Breadcrumbs({ items }) {
    if (!items || items.length === 0) {
        return null; 
    }

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs-nav">
            <ol className="breadcrumbs-list">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumbs-item">
                        {index < items.length - 1 ? (
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