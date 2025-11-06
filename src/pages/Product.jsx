import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BannerProductPage from '../components/BannerProductPage';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetails from "../components/ProductDetails";
import { breadcrumb, relacionados } from "../data";
import ProductSection from '../components/ProductSection';
import ShoeSpecs from "../components/ShoeSpecs";

function Product() {
  const { id } = useParams();
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/produtos.json")
      .then((res) => res.json())
      .then((data) => {
        const produto = data.find((p) => p.id === parseInt(id));
        setProdutoSelecionado(produto);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar produto.json:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando produto...</p>;
  if (!produtoSelecionado) return <p>Produto não encontrado.</p>;

  return (
    <div className="product-container">
      <header>
        <BannerProductPage />
        <Breadcrumbs items={breadcrumb} />
      </header>
      <main>
        <ProductDetails product={produtoSelecionado} />
        
        {/* 2. Verifica se existem especificações e as passa para o componente */}
        {produtoSelecionado.specifications && (
          <>
            <h2 className="specifications-title">Especificações</h2>
            <ShoeSpecs specs={produtoSelecionado.specifications} />
          </>
        )}

        {/* 3. Verifica se existe uma descrição e a renderiza */}
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

export default Product;