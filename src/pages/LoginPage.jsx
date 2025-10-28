import React from 'react';
import LoginForm from '../components/LoginForm'; 
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/Auth.css'; 

function LoginPage() {
  const navigate = useNavigate(); 

  const handleLoginSuccess = () => {
    navigate('/'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <div className="auth-toggle">
          <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;