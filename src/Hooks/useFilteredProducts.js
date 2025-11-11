import { useMemo } from 'react';

const filterAndPrepareProducts = (products, tag, itemsPerRow = 4) => {
    
    if(!products || products.length === 0){
        return [];
    }
    const filtered = products.filter(p => p.tags && p.tags.includes(tag));
    const count = Math.floor(filtered.length / itemsPerRow) * itemsPerRow;
    return filtered.slice(0, count);
};

export function useFilteredProducts(allProducts) {
    const maisProcurados = useMemo(() => {
        return filterAndPrepareProducts(allProducts, 'Mais Vendido');
    }, [allProducts]);

    const lancamentos = useMemo (() => {
        return filterAndPrepareProducts(allProducts, 'Lançamento');
    }, [allProducts]);

    return {maisProcurados, lancamentos}
}