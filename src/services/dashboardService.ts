// ============================================================================
// services/dashboardService.ts - SERVICIO PARA DASHBOARD
// ============================================================================
import { apiClient } from './apiClient';

export interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
    vipStatus: boolean;
    beautyPoints: number;
  };
  nextAppointment?: {
    id: string;
    treatment: string;
    date: string;
    time: string;
    professional: string;
    clinic: string;
  };
  featuredTreatments: Array<{
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    iconName: string;
    emoji?: string;
    isVipExclusive?: boolean;
  }>;
  wellnessTip?: {
    title: string;
    content: string;
    category: string;
    iconName: string;
  };
  stats: {
    totalSessions: number;
    beautyPoints: number;
    totalInvestment: number;
    vipStatus: boolean;
  };
}

export interface BeautyPointsData {
  currentPoints: number;
  vipMultiplier: number;
  history: Array<{
    date: string;
    treatment: string;
    pointsEarned: number;
  }>;
  availableRewards: Array<{
    points: number;
    reward: string;
  }>;
  nextRewards: Array<{
    points: number;
    reward: string;
  }>;
}

class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await apiClient.get('/dashboard');
      
      if (response.data.success) {
        // Transformar los datos del backend al formato esperado por el frontend
        const data = response.data.data;
        
        return {
          user: {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            vipStatus: data.user.vipStatus,
            beautyPoints: data.user.beautyPoints,
          },
          nextAppointment: data.nextAppointment ? {
            id: data.nextAppointment.id,
            treatment: data.nextAppointment.treatment,
            date: data.nextAppointment.date,
            time: data.nextAppointment.time,
            professional: data.nextAppointment.professional,
            clinic: data.nextAppointment.clinic,
          } : undefined,
          featuredTreatments: data.featuredTreatments.map((treatment: any) => ({
            id: treatment.id,
            name: treatment.name,
            description: treatment.description,
            duration: treatment.duration,
            price: treatment.price,
            iconName: treatment.iconName,
            emoji: this.getEmojiForTreatment(treatment.iconName),
            isVipExclusive: treatment.isVipExclusive || false,
          })),
          wellnessTip: data.wellnessTip ? {
            title: data.wellnessTip.title,
            content: data.wellnessTip.content,
            category: data.wellnessTip.category,
            iconName: data.wellnessTip.iconName,
          } : undefined,
          stats: data.stats,
        };
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      throw new Error(error.response?.data?.error?.message || 'Error al cargar el dashboard');
    }
  }

  async getBeautyPoints(): Promise<BeautyPointsData> {
    try {
      const response = await apiClient.get('/dashboard/beauty-points');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Error fetching beauty points:', error);
      throw new Error(error.response?.data?.error?.message || 'Error al cargar Beauty Points');
    }
  }

  private getEmojiForTreatment(iconName: string): string {
    const emojiMap: { [key: string]: string } = {
      'sparkles': '✨',
      'waves': '🌊',
      'droplets': '💧',
      'star': '⭐',
      'heart': '💖',
      'flower': '🌸',
      'leaf': '🍃',
      'crown': '👑',
      'gem': '💎',
      'fire': '🔥',
    };
    
    return emojiMap[iconName] || '💆‍♀️';
  }

  // Método para formatear fechas
  formatAppointmentDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Hoy';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Mañana';
      } else {
        return date.toLocaleDateString('es-ES', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        });
      }
    } catch (error) {
      return dateString;
    }
  }

  // Método para formatear horas
  formatAppointmentTime(timeString: string): string {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch (error) {
      return timeString;
    }
  }
}

export const dashboardService = new DashboardService();