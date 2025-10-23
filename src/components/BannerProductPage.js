import React from 'react';
import { Link } from 'react-router-dom';


function BannerProductPage() {
    return (
        <section>
            <div className="product-banner">
                <div
                    className="banner-content"
                    style={{
                        backgroundImage: "url('/img/fundo5.jpg')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '200px',
                    }}
                ></div>
            </div>
        </section>
    );
}

export default BannerProductPage;
