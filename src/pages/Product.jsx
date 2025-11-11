import React from "react";
import { useMemo } from 'react';
import { useParams } from "react-router-dom";
import BannerProductPage from '../components/BannerProductPage';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetails from "../components/ProductDetails";
import { breadcrumb, relacionados } from "../data";
import ProductSection from '../components/ProductSection';
import ShoeSpecs from "../components/ShoeSpecs";
import {useProducts} from "../Hooks/useProduct";

function ProductPage() {
  const { id } = useParams();
  const { data: allProducts, loading, error } = useProducts();
  const produtoSelecionado = useMemo(() => {

    if (!allProducts || !id) return null;

    return allProducts.find((p) => p.id === parseInt(id));

  }, [allProducts, id]); 


  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>Ocorreu um erro ao carregar os dados.</p>;
  if (!produtoSelecionado) return <p>Produto não encontrado.</p>;

  return (
    <div className="product-container">
      <header>
        <BannerProductPage />
        <Breadcrumbs items={breadcrumb} />
      </header>
      <main>
        <ProductDetails product={produtoSelecionado} />
        {produtoSelecionado.specifications && (
          <>
            <h2 className="specifications-title">Especificações</h2>
            <ShoeSpecs specs={produtoSelecionado.specifications} />
          </>
        )}
        {produtoSelecionado.description && (
          <div className="product-description"> 
            <h2>Descrição do Produto</h2> 
            <p>{produtoSelecionado.description}</p>
          </div>
        )}

        <ProductSection title="Relacionados" products={relacionados} />
      </main>
    </div>
  );
}

export default ProductPage;