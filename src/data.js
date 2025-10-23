
import { GiTruck, GiTrade } from 'react-icons/gi';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { BiAward } from 'react-icons/bi';

export const policies = [
  { icon: GiTruck, text: "Frete Grátis acima de R$ 299" },
  { icon: GiTrade, text: "Primeira troca grátis" },
  { icon: AiOutlineCreditCard, text: "Até 10x sem juros" },
  { icon: BiAward, text: "Curadoria de especialistas" },
];

export const breadcrumb = [
  { label: "Home", path: "/" },
  { label: "Tênis", path: "/" },
  { label: "Masculino", path: "/" },
  { label: "Promoções", path: "/product" },
];


export const maisProcurados = [
  { id: 1, discount: '-33% OFF',name: 'Tênis Olympikus Corre 4', imageUrl: '/img/correazul1.png',originalPrice: 699.99, price: 499.99, installments: '10x de R$ 49,99' , tags:['Lançamento','Frete Grátis']},
  { id: 2, discount: '-15% OFF',name: 'Amazfit GTR 4 New', imageUrl: '/img/relogio.png',originalPrice: 1299.90, price: 1099.90, installments: '10x de R$ 109,90',tags:['Lançamento','Frete Grátis'] },
  { id: 3,discount: '-30% OFF', name: 'Calção de Compressão', imageUrl: '/img/calcao.png',originalPrice: 129.99, price: 89.99, installments: '3x de R$ 29,99', tags:[] },
  { id: 4, name: 'Horus Gel Frutas Vermelhas', imageUrl: '/img/suplementos.png', price: 49.99, installments: null, tags:[] },
];


export const lancamentos = [
  
  { id: 5, name: 'Tênis Nike Zoom Fly 6', imageUrl: '/img/nike zoom.png', price: 199.99, installments: '5x de R$ 39,99', tags:['Lançamento','Frete Grátis'] },
  { id: 6, name: 'Tênis Corre Supra 2', imageUrl: '/img/corre supra.png', price: 299.99, installments: '8x de R$ 37,49', tags:['Lançamento','Frete Grátis']},
  { id: 7, name: 'Pochette Fitness Corrida', imageUrl: '/img/pochette.png', price: 199.99, installments: '5x de R$ 39,99', tags:[]},
  { id: 8, name: 'Top Signature Samba 1', imageUrl: '/img/top.png', price: 199.99, installments: '5x de R$ 39,99', tags:[]},
  { id: 9, name: 'Tênis Olympikus Corre 4', imageUrl: '/img/image (42).png', price: 499.99, installments: '10x de R$ 49,99', tags:['Lançamento','Frete Grátis'] },
  { id: 10, name: 'Amazfit GTR 4 New', imageUrl: '/img/relogio.png', price: 1099.90, installments: '10x de R$ 109,90', tags:['Lançamento','Frete Grátis'] },
  { id: 11, name: 'Óculos de Sol Para Corrida', imageUrl: '/img/oculos.png', price: 199.99, installments: '5x de R$ 39,99', tags:[]},
  { id: 12, name: 'Horus Gel Frutas Vermelhas', imageUrl: '/img/suplementos.png', price: 49.99, installments: null, tags:[] },
  { id: 12, name: 'Horus Gel Frutas Vermelhas', imageUrl: '/img/suplementos.png', price: 49.99, installments: null, tags:[] },
  { id: 12, name: 'Horus Gel Frutas Vermelhas', imageUrl: '/img/suplementos.png', price: 49.99, installments: null, tags:[] },
  { id: 12, name: 'Horus Gel Frutas Vermelhas', imageUrl: '/img/suplementos.png', price: 49.99, installments: null, tags:[] },
  { id: 12, name: 'Horus Gel Frutas Vermelhas', imageUrl: '/img/suplementos.png', price: 49.99, installments: null, tags:[] },
];

 export const product = {
  name: 'Tênis Olympikus Corre 4',
  color: 'Turquesa + Moranho',
  rating: 4.9,
  price: 499.90,
  installments: '10x de R$ 49,90',
  sizes: [38, 39, 40, 41, 42, 43, 44],
  imageUrl: '/img/correazul1.png',
  thumbnails: [
    '/img/correazul1.png',
    '/img/correazul2.png',
    '/img/correazul3.png',
    '/img/correazul4.png',
    '/img/correazu5.png',
    '/img/correazul1.png'
  ]
};
export const relacionados = [
  {id: 5, name: 'Tênis Nike Zoom Fly 6', imageUrl: '/img/nike zoom.png', price: 199.99, installments: '5x de R$ 39,99', tags:['Lançamento','Frete Grátis'] },
  { id: 6, name: 'Tênis Corre Supra 2', imageUrl: '/img/corre supra.png', price: 299.99, installments: '8x de R$ 37,49', tags:['Lançamento','Frete Grátis']},
  { id: 7, name: 'Pochette Fitness Corrida', imageUrl: '/img/pochette.png', price: 199.99, installments: '5x de R$ 39,99', tags:[]},
  { id: 8, name: 'Top Signature Samba 1', imageUrl: '/img/top.png', price: 199.99, installments: '5x de R$ 39,99', tags:[]},
]

export const specs = [
  { image: '/img/Running.png', label: 'Indicado para', value: 'Corrida' },
  { image: '/img/pegada.png', label: 'Pisada', value: 'Neutra' },
  { image: '/img/localizacao.png', label: 'Distância', value: '21 km' },
  { image: '/img/chip.png', label: 'Tecnologia', value: 'Gripper, ELEVA' },
  { image: '/img/setabaixo.png', label: 'Drop', value: '8 mm' },
  { image: '/img/peso.png', label: 'Peso aproximado', value: '230g' },
];