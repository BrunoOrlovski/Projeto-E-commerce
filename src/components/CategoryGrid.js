import React from "react";
import "../styles/CategoryGrid.css";


const categories = [
  {
    name: "Tênis de Corrida",
    imageUrl: "/img/categoriaTenis.png",
  },
  {
    name: "Acessórios",
    imageUrl: "img/categoriaAces.png",
  },
  {
    name: "Suplementos",
    imageUrl: "img/categoriaSuple.png",
  },
  {
    name: "Vestuário",
    imageUrl: "img/categoriaVest.png",
  },
];

function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <div
          key={index}
          // Note que removemos a classe dinâmica. Só 'category-card' agora.
          className="category-card"
          style={{ backgroundImage: `url(${category.imageUrl})` }}
        >
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;
