import { useMemo } from 'react';

const prepareProductRows = (products, filterFn, itemsPerRow = 4) => {
    
    if (!products || products.length === 0) {
        return [];
    }

    const filtered = products.filter(filterFn);

    const count = Math.floor(filtered.length / itemsPerRow) * itemsPerRow;
    
    return filtered.slice(0, count);
};

export function useFilteredProducts(allProducts) {
    
    const maisProcurados = useMemo(() => {
        const filterLogic = p => p.tags && p.tags.includes('Mais Vendido');
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);

    const lancamentos = useMemo(() => {
        const filterLogic = p => p.tags && p.tags.includes('Lançamento');
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);

    const calcados = useMemo(() => {
        const filterLogic = p => p.category === 'Calçados';
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);
    
    const eletronicos = useMemo(() => {
        const filterLogic = p => p.category === 'Eletrônicos';
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);

    const vestuario = useMemo(() => {
        const filterLogic = p => p.category === 'Vestuário';
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);

    const acessorios = useMemo(() => {
        const filterLogic = p => p.category === 'Acessórios';
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);

     const suplementos = useMemo(() => {
        const filterLogic = p => p.category === 'Suplementos';
        return prepareProductRows(allProducts, filterLogic);
    }, [allProducts]);
 
    return { 
        maisProcurados, 
        lancamentos, 
        calcados, 
        eletronicos,
        vestuario,
        acessorios,
        suplementos
    };
}