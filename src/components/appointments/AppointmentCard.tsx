// components/appointments/AppointmentCard.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { modernColors, modernSpacing, modernTypography } from '../../styles';
import { Appointment } from '../../../types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
  onReschedule: () => void;
  onCancel: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isPast?: boolean;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onReschedule,
  onCancel,
  isFirst = false,
  isLast = false,
  isPast = false,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStatusConfig = (status: Appointment['status']) => {
    const configs = {
      CONFIRMED: {
        color: modernColors.success,
        backgroundColor: modernColors.success + '20',
        label: 'Confirmada',
        icon: '✓',
      },
      PENDING: {
        color: modernColors.warning,
        backgroundColor: modernColors.warning + '20',
        label: 'Pendiente',
        icon: '⏳',
      },
      CANCELLED: {
        color: modernColors.error,
        backgroundColor: modernColors.error + '20',
        label: 'Cancelada',
        icon: '✕',
      },
      COMPLETED: {
        color: modernColors.gray600,
        backgroundColor: modernColors.gray100,
        label: 'Completada',
        icon: '✓',
      },
    };
    return configs[status] || configs.PENDING;
  };

  const statusConfig = getStatusConfig(appointment.status);

  // Formatear fecha y hora
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // HH:MM
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isFirst && styles.firstCard,
        isLast && styles.lastCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.98}
        style={[styles.card, isPast && styles.cardPast]}
      >
        <LinearGradient
          colors={isPast ? ['#F8F8F8', '#F5F5F5'] : ['#FFFFFF', '#FEFEFE']}
          style={styles.gradient}
        >
          {/* Header con fecha, hora y estado */}
          <View style={styles.header}>
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTimeBox}>
                <Text style={[styles.date, isPast && styles.textPast]}>
                  {formatDate(appointment.date)}
                </Text>
                <View style={styles.timeDot} />
                <Text style={[styles.time, isPast && styles.textPast]}>
                  {formatTime(appointment.time)}
                </Text>
              </View>
            </View>

            <View 
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.backgroundColor }
              ]}
            >
              <Text style={[styles.statusIcon, { color: statusConfig.color }]}>
                {statusConfig.icon}
              </Text>
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>

          {/* Contenido principal */}
          <View style={styles.content}>
            <Text style={[styles.treatment, isPast && styles.textPast]}>
              {appointment.treatment}
            </Text>
            <View style={styles.professionalRow}>
              <Text style={styles.professionalLabel}>con</Text>
              <Text style={[styles.professionalName, isPast && styles.textPast]}>
                {appointment.professional}
              </Text>
            </View>
            
            {appointment.clinic && (
              <View style={styles.clinicRow}>
                <Text style={styles.clinicIcon}>📍</Text>
                <Text style={styles.clinicName}>{appointment.clinic}</Text>
              </View>
            )}
          </View>

          {/* Acciones */}
          {!isPast && appointment.status !== 'CANCELLED' && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onReschedule}
                activeOpacity={0.7}
              >
                <Text style={styles.rescheduleIcon}>🔄</Text>
                <Text style={styles.actionText}>Reprogramar</Text>
              </TouchableOpacity>

              <View style={styles.actionDivider} />

              <TouchableOpacity
                style={styles.actionButton}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelIcon}>✕</Text>
                <Text style={[styles.actionText, styles.cancelText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Indicador de cita pasada */}
          {appointment.status === 'COMPLETED' && (
            <View style={styles.completedIndicator}>
              <Text style={styles.completedText}>
                Cita completada • 
                {appointment.rating && ` ${appointment.rating} ⭐`}
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: modernSpacing.md,
  },
  firstCard: {
    marginTop: modernSpacing.xs,
  },
  lastCard: {
    marginBottom: modernSpacing.xl,
  },
  card: {
    borderRadius: modernSpacing.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardPast: {
    elevation: 1,
    shadowOpacity: 0.05,
  },
  gradient: {
    padding: modernSpacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: modernSpacing.md,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: modernSpacing.sm,
  },
  date: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray700,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: modernColors.gray300,
  },
  time: {
    ...modernTypography.bodyLarge,
    color: modernColors.gray900,
    fontWeight: '700',
  },
  textPast: {
    opacity: 0.6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.sm,
    gap: modernSpacing.xs,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    ...modernTypography.caption,
    fontWeight: '600',
  },
  content: {
    marginBottom: modernSpacing.md,
  },
  treatment: {
    ...modernTypography.headingSmall,
    color: modernColors.gray900,
    fontWeight: '700',
    marginBottom: modernSpacing.xs,
  },
  professionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: modernSpacing.xs,
    marginBottom: modernSpacing.xs,
  },
  professionalLabel: {
    ...modernTypography.bodySmall,
    color: modernColors.gray500,
  },
  professionalName: {
    ...modernTypography.bodyMedium,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: modernSpacing.xs,
    marginTop: modernSpacing.xs,
  },
  clinicIcon: {
    fontSize: 12,
  },
  clinicName: {
    ...modernTypography.caption,
    color: modernColors.gray600,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: modernSpacing.sm,
    paddingTop: modernSpacing.md,
    borderTopWidth: 1,
    borderTopColor: modernColors.gray100,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: modernSpacing.xs,
    paddingVertical: modernSpacing.xs,
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: modernColors.gray200,
  },
  rescheduleIcon: {
    fontSize: 16,
  },
  cancelIcon: {
    fontSize: 14,
    color: modernColors.error,
  },
  actionText: {
    ...modernTypography.bodySmall,
    color: modernColors.gray700,
    fontWeight: '600',
  },
  cancelText: {
    color: modernColors.error,
  },
  completedIndicator: {
    backgroundColor: modernColors.success + '10',
    paddingHorizontal: modernSpacing.sm,
    paddingVertical: modernSpacing.xs,
    borderRadius: modernSpacing.xs,
    marginTop: modernSpacing.sm,
  },
  completedText: {
    ...modernTypography.caption,
    color: modernColors.success,
    fontWeight: '600',
    textAlign: 'center',
  },
});