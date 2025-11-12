import React from 'react'; 
import { Link } from 'react-router-dom';
import {
  faMagnifyingGlass,
  faUser,
  faShoppingCart,
  faChevronDown,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import '../styles/header.css';
import { useHeader} from '../Hooks/useHeader';

const logoPath = "/img/Logo sem fundo.png";

function Header() {

  const {
    activeMenu,
    showSearchInput,
    isMenuOpen,
    itemCount,
    menuRef,
    hamburgerRef,
    mobileSearchRef,
    desktopSearchRef,
    desktopIconsRef,
    toggleMenu,
    toggleSearchInput,
    toggleMobileMenu,
    handleLinkClick
  } = useHeader();

  return (
    <nav className={`header-nav ${isMenuOpen ? 'menu-active' : ''}`}>
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
                    <li key={link}><Link to={link} onClick={handleLinkClick}>{labels[i]}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="header-menu-icons mobile-only"> 
          <ul>
            <li className="search-icon" ref={mobileSearchRef}> 
              <span onClick={toggleSearchInput}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                {showSearchInput && ( 
                  <div className="search-input-wrapper active">
                    <input
                      type="text"
                      placeholder="Digite sua busca..."
                      className="search-input"
                      onClick={(e) => e.stopPropagation()} 
                    />
                  </div>
                )}
              </span>
            </li>
            <li className="dropdown-parent">
              <span onClick={() => toggleMenu("login")} className="user-dropdown-trigger">
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
              </span>
              {activeMenu === "login" && (
                <ul className="dropdown">
                  <li><Link to="/login" onClick={handleLinkClick}>Efetuar Login</Link></li>
                  <li><Link to="/login" onClick={handleLinkClick}>Cadastrar-se</Link></li>
                </ul>
              )}
            </li>
            <li className="cart-icon-wrapper">
              <Link to="/ShoppCart" onClick={handleLinkClick}>
                <FontAwesomeIcon icon={faShoppingCart} />
                {itemCount > 0 && (
                  <span className="cart-counter">{itemCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="header-menu-icons desktop-only" ref={desktopIconsRef}> 
        <ul>
          <li className="search-icon" ref={desktopSearchRef}>
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
                  onClick={(e) => e.stopPropagation()} 
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
                <li><Link to="/login" onClick={handleLinkClick}>Efetuar Login</Link></li>
                <li><Link to="/login" onClick={handleLinkClick}>Cadastrar-se</Link></li>
              </ul>
            )}
          </li>
          <li className="cart-icon-wrapper">
            <Link to="/ShoppCart"> 
              <FontAwesomeIcon icon={faShoppingCart} />
              {itemCount > 0 && (
                <span className="cart-counter">{itemCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      <button
        className="hamburger-menu"
        onClick={toggleMobileMenu}
        ref={hamburgerRef}
      >
        {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
    </nav>
  );
}

export default Header;