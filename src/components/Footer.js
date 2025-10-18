import React from 'react';
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Institucional</h4>
          <ul>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/trabalhe">Trabalhe Conosco</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Ajuda</h4>
          <ul>
            <li><a href="/">Dúvidas Frequentes</a></li>
            <li><a href="/">Como Comprar</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Serviços</h4>
          <ul>
            <li><a href="/minha-conta">Minha Conta</a></li>
            <li><a href="/trocas">Trocas e Devoluções</a></li>
            <li><a href="/entregas">Entregas</a></li>
            <li><a href="/ShoppCart">Carrinho</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Relacionamento</h4>
          <ul>
            <li>Contato Relacionamento</li>
            <li>(xx) xxxx-xxxx</li>
          </ul>
        </div>

        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ritmo Urbano. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
