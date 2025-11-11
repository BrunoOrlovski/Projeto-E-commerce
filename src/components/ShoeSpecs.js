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

const ShoeSpecs = ({ specs = [] }) => {
  return (
    <section className="shoe-specs">
      {specs.map((specItem, index) => {
        const specInfo = allSpecsData[specItem.type];

        if (!specInfo) {
          return null;
        }

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
