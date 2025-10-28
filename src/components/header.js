import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faUser,faShoppingCart,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';

const logoPath = "/img/Logo sem fundo.png";

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (menuName) => {
  setActiveMenu(prev => {
    const newState = (prev === menuName ? null : menuName); 
    console.log('Active menu toggled to:', newState); 
    return newState; 
     });
  };

const toggleSearchInput = () => {
  setShowSearchInput(prev => !prev);
};

  return (
    <nav className="header-nav">
      <div className="header-logo-section">
        <Link to='/' className='logo-link'>
          <img src={logoPath} alt="Logo Ritmo Urbano" className="header-logo" />
          <h3 className="logo-name">RITMO URBANO</h3>
        </Link>
      </div>

      <div className="header-menu-main" ref={menuRef}>
        <ul>
          {[
            { name: "Tênis", key: "tenis", links: ["/tenis/casual", "/tenis/esportivo", "/tenis/skate"], labels: ["Casual", "Esportivo", "Skate"] },
            { name: "Vestuário", key: "vestuario", links: ["/vestuario/camisas", "/vestuario/calções", "/vestuario/cortavento"], labels: ["Camisas", "Calções", "Corta Vento"] },
            { name: "Acessórios", key: "acessorios", links: ["/acessorios/bonés", "/acessorios/meias", "/acessorios/mochilas"], labels: ["Bonés", "Meias", "Mochilas"] },
            { name: "Suplementos", key: "suplementos", links: ["/suplementos/proteinas", "/suplementos/creatina", "/suplementos/termogenicos"], labels: ["Proteínas", "Creatina", "Termogênicos"] },
            { name: "Promoções", key: "promocoes", links: ["/promocoes/tenis", "/promocoes/vestuario", "/promocoes/combo"], labels: ["Tênis em oferta", "Vestuário com desconto", "Combos especiais"] }
          ].map(({ name, key, links, labels }) => (
            <li className="dropdown-parent" key={key}>
              <span onClick={() => toggleMenu(key)}>
                {name} <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
              </span>
              {activeMenu === key && (
                <ul className="dropdown">
                  {links.map((link, i) => (
                    <li key={link}><Link to={link}>{labels[i]}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="header-menu-icons">
        <ul>
        <li className="search-icon" ref={searchRef}>
        {!showSearchInput && (
            <span onClick={toggleSearchInput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
        )}
        {showSearchInput && (
            <div className="search-input-wrapper active">
            <input
                type="text"
                placeholder="Digite sua busca..."
                className="search-input"
            />
            </div>
        )}
        </li>

          <li className="dropdown-parent">
            <span onClick={() => toggleMenu("login")} className="user-dropdown-trigger">
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
            </span>
            {activeMenu === "login" && (
              <ul className="dropdown">
                <li><Link to="/login" onClick={() => setActiveMenu(null)}>Efetuar Login</Link></li>
                <li><Link to="/login" onClick={() => setActiveMenu(null)}>Cadastrar-se</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/ShoppCart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
