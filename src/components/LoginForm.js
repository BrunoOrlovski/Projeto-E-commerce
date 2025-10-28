import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <form onSubmit={handleSubmit} noValidate> {/* noValidate desabilita a validação HTML5 padrão */}
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginForm;