import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // NOVO: Estado para controlar visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'O E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
      newErrors.email = 'Por favor, insira um e-mail válido.';
    }

    if (!password.trim()) {
      newErrors.password = 'A Senha é obrigatória.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setErrors({});

    if (validateFields()) {
      return; 
    }

    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userFound = storedUsers.find(
      u => u.email === email && u.password === password
    );

    if (userFound) {
      alert(`Bem-vindo, ${userFound.name}!`);
      localStorage.setItem('currentUser', JSON.stringify({ email: userFound.email, name: userFound.name })); 
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      navigate('/');
    } else {
      setErrors(prev => ({ ...prev, geral: 'E-mail ou senha incorretos.' }));
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {errors.geral && <p className="error-message">{errors.geral}</p>}
      <form onSubmit={handleSubmit} noValidate> 
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="password">Senha:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                // Ícone Olho Aberto (Ocultar)
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                // Ícone Olho Fechado (Mostrar)
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
          
          <div className="forgot-password-link">
            <button 
              type="button" 
              className="link-button"
              onClick={() => navigate('/recuperar-senha')} 
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginForm;