export const formatCurrency = (amount: number, currency: string = 'ARS'): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('es-AR').format(number);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatPhone = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format with country code +XX (XXX) XXX-XXXX
  if (cleaned.length > 10) {
    const countryCode = cleaned.slice(0, -10);
    const areaCode = cleaned.slice(-10, -7);
    const firstPart = cleaned.slice(-7, -4);
    const lastPart = cleaned.slice(-4);
    return `+${countryCode} (${areaCode}) ${firstPart}-${lastPart}`;
  }
  
  return phone;
};

export const formatDNI = (dni: string): string => {
  const cleaned = dni.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
};

export const formatName = (firstName: string, lastName: string): string => {
  const first = firstName.trim();
  const last = lastName.trim();
  return `${first} ${last}`;
};

export const formatInitials = (firstName: string, lastName: string): string => {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName.charAt(0).toUpperCase();
  return `${first}${last}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
};

export const formatMedicalRecord = (type: string): string => {
  const types: Record<string, string> = {
    consultation: 'Consulta',
    prescription: 'Receta',
    diagnosis: 'Diagnóstico',
    treatment: 'Tratamiento',
    lab_result: 'Resultado de Laboratorio',
  };
  
  return types[type] || type;
};

export const formatStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    scheduled: 'Programada',
    confirmed: 'Confirmada',
    in_progress: 'En Progreso',
    completed: 'Completada',
    cancelled: 'Cancelada',
    no_show: 'No Asistió',
    active: 'Activo',
    inactive: 'Inactivo',
    blocked: 'Bloqueado',
  };
  
  return statuses[status] || status;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
