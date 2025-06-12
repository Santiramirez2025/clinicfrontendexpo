export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateAge = (birthDate: Date): boolean => {
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  return age >= 0 && age <= 120;
};

export const validateDNI = (dni: string): boolean => {
  const dniRegex = /^\d{7,8}$/;
  return dniRegex.test(dni);
};

export const getValidationErrors = (data: Record<string, any>, rules: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} es requerido`;
      return;
    }
    
    if (rule.email && !validateEmail(value)) {
      errors[field] = 'Email inválido';
      return;
    }
    
    if (rule.phone && !validatePhone(value)) {
      errors[field] = 'Teléfono inválido';
      return;
    }
    
    if (rule.password && !validatePassword(value)) {
      errors[field] = 'Contraseña debe tener 8+ caracteres, mayúscula, minúscula y número';
      return;
    }
    
    if (rule.minLength && !validateMinLength(value, rule.minLength)) {
      errors[field] = `Mínimo ${rule.minLength} caracteres`;
      return;
    }
    
    if (rule.maxLength && !validateMaxLength(value, rule.maxLength)) {
      errors[field] = `Máximo ${rule.maxLength} caracteres`;
      return;
    }
  });
  
  return errors;
};

export const patientValidationRules = {
  firstName: { required: true, minLength: 2, maxLength: 50 },
  lastName: { required: true, minLength: 2, maxLength: 50 },
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  dni: { required: true },
  birthDate: { required: true },
};

export const appointmentValidationRules = {
  patientId: { required: true },
  doctorId: { required: true },
  date: { required: true },
  time: { required: true },
  reason: { required: true, maxLength: 500 },
};

export const userValidationRules = {
  email: { required: true, email: true },
  password: { required: true, password: true },
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
};
