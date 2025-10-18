
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faShoppingCart, faChevronDown} from '@fortawesome/free-solid-svg-icons';


import '../styles/header.css'; 


const logoPath = "/img/Logo sem fundo.png"; 

function Header () {
    return (
       
        <nav className="header-nav"> 
            <div className="header-logo-section"> 
                <Link to='/'className='logo-link'>
                    <img src={logoPath} alt="Logo Ritmo Urbano" className="header-logo"/> 
                    <h3 className="logo-name">RITMO URBANO</h3> 
                </Link>
            </div>
            <div className="header-menu-main"> 
                <ul>
                    <li><Link to="/tenis">Tênis <FontAwesomeIcon icon={faChevronDown} className='dropdown-arrow'/></Link></li>
                    <li><Link to="/vestuario">Vestuário <FontAwesomeIcon icon={faChevronDown} className='dropdown-arrow'/></Link></li>
                    <li><Link to="/acessorios">Acessórios <FontAwesomeIcon icon={faChevronDown} className='dropdown-arrow'/></Link></li>
                    <li><Link to="/suplementos">Suplementos <FontAwesomeIcon icon={faChevronDown} className='dropdown-arrow'/></Link></li>
                    <li><Link to="/promocoes">Promoções <FontAwesomeIcon icon={faChevronDown} className='dropdown-arrow'/></Link></li>
                </ul>
            </div>

            <div className="header-menu-icons"> 
                <ul>
                    <li><Link to="/pesquisa">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </Link>
                    </li>
                    <li><Link to="/login">
                        <FontAwesomeIcon icon={faUser}/>
                        </Link>
                    </li>
                    <li> 
                        <Link to="/carrinho">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;