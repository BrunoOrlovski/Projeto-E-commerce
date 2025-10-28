import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm'; 
import '../styles/Auth.css';

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ 
    email: '', password: '', confirmPassword: '', name: '', cpf: '', 
    phone: '', cep: '', street: '', number: '', complement: '', 
    neighborhood: '', city: '', state: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateStep1 = () => { 
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'O E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido.';
    if (!formData.password.trim()) newErrors.password = 'A Senha é obrigatória.';
    else if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'A confirmação é obrigatória.';
    else if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    return newErrors;
  };
  const validateStep2 = () => { 
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O Nome é obrigatório.';
    if (!formData.cpf.trim()) newErrors.cpf = 'O CPF é obrigatório.';
    if (!formData.phone.trim()) newErrors.phone = 'O Telefone é obrigatório.';
    return newErrors;
  };
  const validateStep3 = () => { 
    const newErrors = {};
    if (!formData.cep.trim()) newErrors.cep = 'O CEP é obrigatório.';
    if (!formData.street.trim()) newErrors.street = 'A Rua é obrigatória.';
    if (!formData.number.trim()) newErrors.number = 'O Número é obrigatório.';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'O Bairro é obrigatório.';
    if (!formData.city.trim()) newErrors.city = 'A Cidade é obrigatória.';
    if (!formData.state.trim()) newErrors.state = 'O Estado é obrigatório.';
    return newErrors;
  };

  const handleNext = () => {
    let stepErrors = {};
    if (currentStep === 1) stepErrors = validateStep1();
    if (currentStep === 2) stepErrors = validateStep2();

    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setErrors({});
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    const stepErrors = validateStep3();

    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

      if (storedUsers.some(user => user.email === formData.email)) {
        setErrors({ email: 'Este e-mail já está cadastrado.' });
        setCurrentStep(1);
        return;
      }

      const newUser = { ...formData };
      delete newUser.confirmPassword;
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
         navigate('/login');
      }, 2000);

    } else {
      setErrors(stepErrors);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-box">
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <RegisterForm
            currentStep={currentStep}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </form>
        <div className="auth-toggle" style={{ marginTop: '30px' }}>
          <p>Já tem uma conta? <Link to="/login">Faça Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;