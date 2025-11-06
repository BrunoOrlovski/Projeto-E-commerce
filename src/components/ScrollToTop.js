// src/componentes/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Este hook pega a localização atual da página
  const { pathname } = useLocation();

  // Este hook dispara um efeito sempre que o 'pathname' (a URL) mudar
  useEffect(() => {
    // Rola a janela para as coordenadas 0, 0 (topo)
    window.scrollTo(0, 0);
  }, [pathname]); // A mágica acontece aqui: ele "assiste" o pathname

  // Este componente não renderiza nada visível,
  // ele apenas executa essa lógica de efeito.
  return null;
}

export default ScrollToTop;