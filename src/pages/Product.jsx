import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BannerProductPage from '../components/BannerProductPage';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetails from "../components/ProductDetails";
import { breadcrumb, relacionados, specs } from "../data";
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
        <h2 className="specifications-title">Especificações</h2>
        <ShoeSpecs specs={specs} />

        <div className="product-description">  
          <h2>Descrição do Produto</h2> 
          <p>Adquira o Tênis Olympikus Corre 4 e leve sua performance ao próximo nível! Com tecnologia Eleva Pro 2.0 na entressola, esse modelo oferece amortecimento muito macio, ideal para corridas de rua e distâncias longas. O peso aproximado é de 260g, garantindo leveza e agilidade. A tecnologia Oxitec 2.0 proporciona um excelente ajuste, enquanto a borracha Gripper na sola oferece alta aderência ao terreno. Para pisadas neutras, o Corre 4 é ideal para maratonistas, atingindo uma média de 4-5 km por minuto. Com foco na sustentabilidade, cerca de 30% do material é reciclado. Não perca essa oportunidade e acelere seus treinos agora mesmo! Compre já e alcance seus objetivos!</p>
        </div>

        <ProductSection title="Relacionados" products={relacionados} />
      </main>
    </div>
  );
}

export default Product;
