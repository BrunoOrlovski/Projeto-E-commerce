import React, { useMemo, useEffect, useState } from "react"; // Adicione useState e useEffect
import { useParams } from "react-router-dom";
import BannerProductPage from '../components/BannerProductPage'; // Ajuste o caminho conforme sua pasta
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetails from "../components/ProductDetails";
import ProductSection from '../components/ProductSection';
import ShoeSpecs from "../components/ShoeSpecs";
import { useProducts } from "../Hooks/useProduct"; // Verifique se o caminho é Hooks ou hooks
import { useFilteredProducts } from "../Hooks/useFilteredProducts";

function ProductPage() {
  const { id } = useParams();
  const { data: allProducts, loading, error } = useProducts();
  const [recentIds, setRecentIds] = useState([]); // Estado local para os IDs recentes

  // 1. Identificar o produto atual
  const produtoSelecionado = useMemo(() => {
    if (!allProducts || !id) return null;
    return allProducts.find((p) => p.id === parseInt(id));
  }, [allProducts, id]);

  // 2. Hooks de filtros (mantido do seu código)
  const { calcados, eletronicos, vestuario, acessorios, suplementos } = useFilteredProducts(allProducts);

  // 3. Produtos Relacionados (mantido do seu código)
  const relatedProducts = useMemo(() => {
    if (!produtoSelecionado || !allProducts) return []; 
    let categoryList = [];
    switch (produtoSelecionado.category) {
      case 'Calçados': categoryList = calcados; break;
      case 'Eletrônicos': categoryList = eletronicos; break;
      case 'Vestuário': categoryList = vestuario; break;
      case 'Acessórios': categoryList = acessorios; break;
      case 'Suplementos': categoryList = suplementos; break;
      default: categoryList = []; 
    }
    return categoryList.filter(p => p.id !== produtoSelecionado.id);
  }, [produtoSelecionado, calcados, eletronicos, vestuario, acessorios, suplementos, allProducts]);

  // --- LÓGICA DE VISTOS RECENTEMENTE ---

  // Passo A: Salvar no LocalStorage quando o produto mudar
  useEffect(() => {
    if (produtoSelecionado) {
      const storedRecents = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      
      // Remove o ID atual se já existir (para mover para o topo)
      const filteredRecents = storedRecents.filter(itemId => itemId !== produtoSelecionado.id);
      
      // Adiciona ao início e limita a 5 itens
      const updatedRecents = [produtoSelecionado.id, ...filteredRecents].slice(0, 5);
      
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecents));
      
      // Atualiza o estado local para re-renderizar a lista abaixo
      setRecentIds(updatedRecents);
    }
  }, [produtoSelecionado]); // Roda sempre que o produtoSelecionado mudar

  // Passo B: Recuperar os objetos completos dos produtos baseados nos IDs
  // (Isso roda na montagem inicial ou quando os IDs mudam)
  useEffect(() => {
      const storedRecents = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      setRecentIds(storedRecents);
  }, []);

  const recentlyViewedProducts = useMemo(() => {
    if (!allProducts || recentIds.length === 0) return [];
    
    // Mapeia os IDs para encontrar os produtos na lista completa
    // Filtramos o produto atual para não mostrar "Visto Recentemente" o que ele já está vendo agora
    return recentIds
      .map(rId => allProducts.find(p => p.id === rId))
      .filter(p => p !== undefined && p.id !== parseInt(id));
      
  }, [allProducts, recentIds, id]);

  // -------------------------------------

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

        {/* Nova Seção: Vistos Recentemente */}
        {recentlyViewedProducts.length > 0 && (
          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <ProductSection
                title="Vistos Recentemente"
                products={recentlyViewedProducts}
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default ProductPage;