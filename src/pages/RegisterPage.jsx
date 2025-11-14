import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm'; 
import '../styles/Auth.css';
import { useRegistrationForm } from '../Hooks/useRegistrationForm';

function RegisterPage() {
  const {
    currentStep,
    TOTAL_STEPS,
    formData,
    errors,
    success,
    progressWidth,
    handleChange,
    handleNext,
    handlePrevious,
    handleSubmit
  } = useRegistrationForm();

  return (
    <div className="auth-container">
      <div className="auth-box">
       <div className="auth-form"> 
          {success && <p className="success-message">{success}</p>}
          <h2>Cadastro ( {currentStep} / {TOTAL_STEPS})</h2>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: progressWidth }}></div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <RegisterForm
              currentStep={currentStep}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </form>
        </div>
        <div className="auth-toggle" style={{ marginTop: '30px' }}>
          <p>Já tem uma conta? <Link to="/login">Faça Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;