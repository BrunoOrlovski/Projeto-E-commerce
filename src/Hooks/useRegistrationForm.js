import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TOTAL_STEPS = 3;

// Este é o hook que conterá toda a lógica
export const useRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ 
    email: '', password: '', confirmPassword: '', name: '', cpf: '', 
    phone: '', cep: '', street: '', number: '', complement: '', 
    neighborhood: '', city: '', state: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // --- FUNÇÕES DE VALIDAÇÃO (Envolvidas em useCallback) ---
  // Elas só serão recriadas se o formData mudar
  
  const validateStep1 = useCallback(() => { 
    /** @type {Record<string, string>} */
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'O E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido.';
    if (!formData.password.trim()) newErrors.password = 'A Senha é obrigatória.';
    else if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'A confirmação é obrigatória.';
    else if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';
    return newErrors;
  }, [formData]);

  const validateStep2 = useCallback(() => { 
    /** @type {Record<string, string>} */
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O Nome é obrigatório.';
    if (!formData.cpf.trim()) newErrors.cpf = 'O CPF é obrigatório.';
    if (!formData.phone.trim()) newErrors.phone = 'O Telefone é obrigatório.';
    return newErrors;
  }, [formData]);

  const validateStep3 = useCallback(() => { 
    /** @type {Record<string, string>} */
    const newErrors = {};
    if (!formData.cep.trim()) newErrors.cep = 'O CEP é obrigatório.';
    if (!formData.street.trim()) newErrors.street = 'A Rua é obrigatória.';
    if (!formData.number.trim()) newErrors.number = 'O Número é obrigatório.';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'O Bairro é obrigatório.';
    if (!formData.city.trim()) newErrors.city = 'A Cidade é obrigatória.';
    if (!formData.state.trim()) newErrors.state = 'O Estado é obrigatório.';
    return newErrors;
  }, [formData]);

  // --- FUNÇÕES DE MANIPULAÇÃO (Handlers) ---

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  }, [errors]); // Depende de 'errors' para limpar o erro

  const handleNext = useCallback(() => {
    let stepErrors = {};
    if (currentStep === 1) stepErrors = validateStep1();
    if (currentStep === 2) stepErrors = validateStep2();

    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      setErrors(stepErrors);
    }
  }, [currentStep, validateStep1, validateStep2]);

  const handlePrevious = useCallback(() => {
    setErrors({});
    setCurrentStep(prevStep => prevStep - 1);
  }, []);

  const handleSubmit = useCallback((e) => {
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
  }, [formData, navigate, validateStep3]);

  // --- VALORES CALCULADOS ---
  const progressWidth = `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`;

  // --- RETORNO DO HOOK ---
  // Exporta tudo que o componente de JSX precisa
  return {
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
  };
};