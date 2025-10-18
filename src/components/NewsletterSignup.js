import React, { useState } from 'react';
import '../styles/NewsletterSignup.css';

const NewsletterSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Você precisa concordar com a Política de Privacidade.');
      return;
    }
    // Aqui você pode integrar com backend ou serviço de email
    console.log('Cadastro enviado:', { name, email });
  };

  return (
    <section className="newsletter">
      <h2 className="newsletter-title">Receba ofertas e descontos exclusivos</h2>
      <p className="newsletter-description">
        Ao se cadastrar, você concorda em receber ofertas e novidades da loja Netshoes por e-mail conforme nossa{' '}
        <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
      </p>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="newsletter-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          Concordo com a Política de Privacidade
        </label>

        <button type="submit" className="newsletter-button">CADASTRAR</button>
      </form>
    </section>
  );
};

export default NewsletterSignup;
