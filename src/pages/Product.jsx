import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import BannerProductPage from '../components/BannerProductPage';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetails from "../components/ProductDetails";
import ProductSection from '../components/ProductSection';
import ShoeSpecs from "../components/ShoeSpecs";
import { useProducts } from "../Hooks/useProduct";
import { useFilteredProducts } from "../Hooks/useFilteredProducts";

function ProductPage() {
  const { id } = useParams();
  const { data: allProducts, loading, error } = useProducts();

  const produtoSelecionado = useMemo(() => {
    if (!allProducts || !id) return null;
    return allProducts.find((p) => p.id === parseInt(id));
  }, [allProducts, id]); 

  const { calcados, eletronicos, vestuario, acessorios, suplementos } = useFilteredProducts(allProducts);

  const relatedProducts = useMemo(() => {
    if (!produtoSelecionado || !allProducts) return []; 

    let categoryList = [];
    
    switch (produtoSelecionado.category) {
      case 'Calçados':
        categoryList = calcados;
        break;
      case 'Eletrônicos':
        categoryList = eletronicos;
        break;
      case 'Vestuário':
        categoryList = vestuario;
        break;
      case 'Acessórios':
        categoryList = acessorios;
        break;
      case 'Suplementos':
        categoryList = suplementos;
        break;
      default:
        categoryList = []; 
    }

    return categoryList.filter(p => p.id !== produtoSelecionado.id);

  }, [produtoSelecionado, calcados, eletronicos, vestuario, acessorios, suplementos, allProducts]);

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>Ocorreu um erro ao carregar os dados.</p>;
  if (!produtoSelecionado) return <p>Produto não encontrado.</p>;

  return (
    <div className="product-container">
      <header>
        <BannerProductPage />
        <Breadcrumbs produto={produtoSelecionado} />
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

        {relatedProducts.length > 0 && (
          <ProductSection
            title="Produtos Relacionados"
            products={relatedProducts} 
          />
        )}
      </main>
    </div>
  );
}

export default ProductPage;