import React from 'react';
import '../styles/ShoeSpecs.css';


const allSpecsData = {
  indicado: {
    label: 'Indicado para',
    image: '/img/running.png', 
  },
  pisada: {
    label: 'Pisada',
    image: '/img/pegada.png',
  },
  distancia: {
    label: 'Distância',
    image: '/img/localizacao.png',
  },
  tecnologia: {
    label: 'Tecnologia',
    image: '/img/chip.png',
  },
  drop: {
    label: 'Drop',
    image: '/img/setabaixo.png',
  },
  peso: {
    label: 'Peso aproximado',
    image: '/img/peso.png',
  }

};

/**
 * Renderiza os cards de especificações.
 * @param {Array<Object>} specs - A lista de especificações do produto.
 * Ex: [{ type: 'pisada', value: 'Neutra' }, { type: 'peso', value: '230g' }]
 */
const ShoeSpecs = ({ specs = [] }) => {
  return (
    <section className="shoe-specs">
      {specs.map((specItem, index) => {
        // 2. Busca a definição do spec (ícone e label) pelo "type"
        const specInfo = allSpecsData[specItem.type];

        // Se o "type" não for encontrado na nossa 'biblioteca', não renderiza
        if (!specInfo) {
          return null;
        }

        // 3. Renderiza o card usando o 'specInfo' e o 'specItem.value'
        return (
          <div key={index} className="spec-item">
            <img src={specInfo.image} alt={specInfo.label} className="spec-image" />
            <div className="spec-text">
              <span className="spec-label">{specInfo.label}</span>
              <span className="spec-value">{specItem.value}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ShoeSpecs;