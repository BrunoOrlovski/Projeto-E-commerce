import react from 'react';
import HeroBanner from '../components/HeroBanner';
import { GiTruck, GiTrade } from 'react-icons/gi'; 
import { AiOutlineCreditCard } from 'react-icons/ai'; 
import { BiAward } from 'react-icons/bi'; 
import '../styles/home.css';
import ProductCard from '../components/ProductCard';
import '../styles/CardProduct.css'


const policies = [
  {
    icon: GiTruck,
    text: "Frete Grátis acima de R$ 299",
  },
  {
    icon: GiTrade,
    text: "Primeira troca grátis",
  },
  {
    icon: AiOutlineCreditCard,
    text: "Até 10x sem juros",
  },
  {
    icon: BiAward,
    text: "Curadoria de especialistas",
  },
];

const products = [
  {
    id: 1,
    name: 'Tênis Olympikus Corre 4',
    imageUrl: '/img/image (49).png',
    price: 499.99,
    installments: '10x de R$ 49,99',
    tags: ['Lançamento', 'Frete Grátis']
  },
  {
    id: 2,
    name: 'Amazfit GTR 4 New',
    imageUrl: '/img/relogio.png',
    price: 1099.90,
    installments: '10x de R$ 109,90',
    tags: ['Lançamento', 'Frete Grátis']
  },
  {
    id: 3,
    name: 'Calção de Compressão',
    imageUrl: '/img/calcao.png',
    price: 89.99,
    installments: '3x de R$ 29,99',
    tags: ['Lançamento']
  },
  {
    id: 4,
    name: 'Horus Gel Frutas Vermelhas',
    imageUrl: '/img/suplementos.png',
    price: 49.99,
    installments: null, 
    tags: [] 
  }
];

function Home() {
    return (
        <div className="home-container">   
              
            <HeroBanner />

            <div className="policy-bar-container"> 
                {policies.map((item, index) => (
                    <div key={index} className="policy-item">
                        <item.icon size={28} className="policy-icon" /> 
                        <span className="policy-text">{item.text}</span>
                    </div>
                ))}
            </div>   
            <div className="title-procurados"><h1>OS MAIS PROCURADOS</h1></div>
            <div className="product-list">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
             ))}
      </div>
        </div>
    );
}   
export default Home;