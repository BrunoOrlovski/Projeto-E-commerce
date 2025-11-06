import React from 'react';

function RegisterForm({ 
    currentStep, 
    formData, 
    errors, 
    handleChange, 
    handleNext, 
    handlePrevious 
}) {

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: 
        return (
          <>
            <h2>Crie sua Conta</h2>
            <div>
              <label htmlFor="reg-email">E-mail:</label>
              <input type="email" id="reg-email" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="reg-password">Senha:</label>
              <input type="password" id="reg-password" name="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirm-password">Confirmar Senha:</label>
              <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
            <button type="button" onClick={handleNext} style={{ marginTop: '20px' }}>Próximo</button>
          </>
        );
      case 2: 
        return (
          <>
            <h2>Dados Pessoais</h2>
            <div>
              <label htmlFor="name">Nome Completo:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
              {errors.cpf && <p className="error-message">{errors.cpf}</p>}
            </div>
            <div>
              <label htmlFor="phone">Telefone:</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            <div className="step-buttons"> 
              <button type="button" onClick={handlePrevious} className="secondary-button">Voltar</button>
              <button type="button" onClick={handleNext}>Próximo</button>
            </div>
          </>
        );
      case 3: 
        return (
          <>
            <h2>Endereço</h2>
            <div>
              <label htmlFor="cep">CEP:</label>
              <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} required />
              {errors.cep && <p className="error-message">{errors.cep}</p>}
            </div>
            <div>
              <label htmlFor="street">Rua:</label>
              <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} required />
              {errors.street && <p className="error-message">{errors.street}</p>}
            </div>
            <div>
              <label htmlFor="number">Número:</label>
              <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} required />
              {errors.number && <p className="error-message">{errors.number}</p>}
            </div>
            <div>
              <label htmlFor="complement">Complemento:</label>
              <input type="text" id="complement" name="complement" value={formData.complement} onChange={handleChange} />
            </div>
             <div>
              <label htmlFor="neighborhood">Bairro:</label>
              <input type="text" id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
              {errors.neighborhood && <p className="error-message">{errors.neighborhood}</p>}
            </div>
             <div>
              <label htmlFor="city">Cidade:</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="state">Estado:</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
              {errors.state && <p className="error-message">{errors.state}</p>}
            </div>
             <div className="step-buttons"> 
              <button type="button" onClick={handlePrevious} className="secondary-button">Voltar</button>
              <button type="submit">Cadastrar</button> 
            </div>
          </>
        );
      default:
        return null; 
    }
  };
  return renderCurrentStep();
}

export default RegisterForm;