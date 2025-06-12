import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 Switch,
 StatusBar,
 Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface NotificationsScreenProps {
 navigation: any;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
 const [notifications, setNotifications] = useState({
   pushEnabled: true,
   appointments: true,
   emergencies: true,
   reports: false,
   marketing: false,
   reminders: true,
   weeklyReport: true,
   appointmentChanges: true,
   patientMessages: true,
   systemUpdates: false,
 });

 const handleToggle = (key: keyof typeof notifications) => {
   if (key === 'pushEnabled' && notifications.pushEnabled) {
     Alert.alert(
       'Desactivar Notificaciones',
       'Esto desactivará todas las notificaciones push. ¿Continuar?',
       [
         { text: 'Cancelar', style: 'cancel' },
         {
           text: 'Desactivar',
           style: 'destructive',
           onPress: () => {
             setNotifications(prev => ({
               ...prev,
               pushEnabled: false,
               appointments: false,
               emergencies: false,
               reminders: false,
               weeklyReport: false,
               appointmentChanges: false,
               patientMessages: false,
             }));
           },
         },
       ]
     );
     return;
   }

   setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
 };

 const renderNotificationItem = (
   title: string,
   subtitle: string,
   key: keyof typeof notifications,
   icon: string,
   disabled: boolean = false
 ) => (
   <View
     style={[
       styles.notificationItem,
       disabled && styles.disabledItem,
     ]}
   >
     <View style={styles.itemContent}>
       <View style={styles.iconContainer}>
         <Icon
           name={icon}
           size={20}
           color={disabled ? '#C7C7CC' : '#007AFF'}
         />
       </View>
       <View style={styles.textContainer}>
         <Text style={[styles.itemTitle, disabled && styles.disabledText]}>
           {title}
         </Text>
         <Text style={[styles.itemSubtitle, disabled && styles.disabledText]}>
           {subtitle}
         </Text>
       </View>
       <Switch
         value={notifications[key]}
         onValueChange={() => handleToggle(key)}
         disabled={disabled}
         trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
         thumbColor="#FFFFFF"
       />
     </View>
   </View>
 );

 const isDisabled = !notifications.pushEnabled;

 return (
   <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
     
     <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <Icon name="arrow-back" size={24} color="#007AFF" />
       </TouchableOpacity>
       <Text style={styles.headerTitle}>Notificaciones</Text>
       <View style={styles.placeholder} />
     </View>

     <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
       {/* Main Toggle */}
       <View style={styles.section}>
         <View style={styles.mainToggleContainer}>
           <View style={styles.mainToggleContent}>
             <Icon name="notifications" size={24} color="#007AFF" />
             <View style={styles.mainToggleText}>
               <Text style={styles.mainToggleTitle}>
                 Notificaciones Push
               </Text>
               <Text style={styles.mainToggleSubtitle}>
                 Recibir notificaciones en el dispositivo
               </Text>
             </View>
             <Switch
               value={notifications.pushEnabled}
               onValueChange={() => handleToggle('pushEnabled')}
               trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
               thumbColor="#FFFFFF"
             />
           </View>
         </View>
       </View>

       {/* Medical Notifications */}
       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Médicas</Text>
         {renderNotificationItem(
           'Citas Médicas',
           'Recordatorios de citas programadas',
           'appointments',
           'calendar-outline',
           isDisabled
         )}
         {renderNotificationItem(
           'Emergencias',
           'Alertas de casos urgentes',
           'emergencies',
           'warning-outline',
           isDisabled
         )}
         {renderNotificationItem(
           'Mensajes de Pacientes',
           'Nuevos mensajes y consultas',
           'patientMessages',
           'chatbubble-outline',
           isDisabled
         )}
         {renderNotificationItem(
           'Cambios de Cita',
           'Cancelaciones y reprogramaciones',
           'appointmentChanges',
           'swap-horizontal-outline',
           isDisabled
         )}
       </View>

       {/* Reports & Analytics */}
       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Reportes</Text>
         {renderNotificationItem(
           'Reportes Semanales',
           'Resumen semanal de actividad',
           'weeklyReport',
           'bar-chart-outline',
           isDisabled
         )}
         {renderNotificationItem(
           'Reportes Mensuales',
           'Estadísticas mensuales detalladas',
           'reports',
           'document-text-outline',
           isDisabled
         )}
       </View>

       {/* System & Others */}
       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Sistema</Text>
         {renderNotificationItem(
           'Recordatorios',
           'Tareas pendientes y seguimientos',
           'reminders',
           'alarm-outline',
           isDisabled
         )}
         {renderNotificationItem(
           'Actualizaciones',
           'Nuevas funciones y mejoras',
           'systemUpdates',
           'download-outline',
           isDisabled
         )}
         {renderNotificationItem(
           'Marketing',
           'Promociones y noticias',
           'marketing',
           'megaphone-outline',
           isDisabled
         )}
       </View>

       {/* Notification Schedule */}
       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Horarios</Text>
         <TouchableOpacity
           style={styles.scheduleItem}
           onPress={() => Alert.alert('Próximamente', 'Configuración de horarios en desarrollo')}
           disabled={isDisabled}
         >
           <View style={styles.itemContent}>
             <View style={styles.iconContainer}>
               <Icon
                 name="time-outline"
                 size={20}
                 color={isDisabled ? '#C7C7CC' : '#007AFF'}
               />
             </View>
             <View style={styles.textContainer}>
               <Text style={[styles.itemTitle, isDisabled && styles.disabledText]}>
                 Horario de Notificaciones
               </Text>
               <Text style={[styles.itemSubtitle, isDisabled && styles.disabledText]}>
                 08:00 - 20:00
               </Text>
             </View>
             <Icon
               name="chevron-forward"
               size={16}
               color={isDisabled ? '#C7C7CC' : '#C7C7CC'}
             />
           </View>
         </TouchableOpacity>
       </View>

       <View style={styles.footer}>
         <Text style={styles.footerText}>
           Las notificaciones te ayudan a mantenerte al día con tu práctica médica.
           Puedes personalizar qué tipos de alertas recibir.
         </Text>
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F8F9FA',
 },
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingHorizontal: 20,
   paddingVertical: 16,
   backgroundColor: '#FFFFFF',
   borderBottomWidth: StyleSheet.hairlineWidth,
   borderBottomColor: '#E5E5EA',
 },
 headerTitle: {
   fontSize: 18,
   fontWeight: '600',
   color: '#000000',
 },
 placeholder: {
   width: 24,
 },
 content: {
   flex: 1,
 },
 section: {
   backgroundColor: '#FFFFFF',
   marginHorizontal: 16,
   marginTop: 20,
   borderRadius: 12,
   paddingVertical: 8,
 },
 sectionTitle: {
   fontSize: 14,
   fontWeight: '600',
   color: '#8E8E93',
   textTransform: 'uppercase',
   paddingHorizontal: 16,
   paddingTop: 8,
   paddingBottom: 12,
 },
 mainToggleContainer: {
   paddingHorizontal: 16,
   paddingVertical: 8,
 },
 mainToggleContent: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 mainToggleText: {
   flex: 1,
   marginLeft: 12,
 },
 mainToggleTitle: {
   fontSize: 18,
   fontWeight: '600',
   color: '#000000',
   marginBottom: 2,
 },
 mainToggleSubtitle: {
   fontSize: 14,
   color: '#8E8E93',
 },
 notificationItem: {
   paddingHorizontal: 16,
   paddingVertical: 12,
   borderBottomWidth: StyleSheet.hairlineWidth,
   borderBottomColor: '#E5E5EA',
 },
 scheduleItem: {
   paddingHorizontal: 16,
   paddingVertical: 12,
 },
 itemContent: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 iconContainer: {
   width: 28,
   height: 28,
   borderRadius: 14,
   backgroundColor: '#F0F8FF',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: 12,
 },
 textContainer: {
   flex: 1,
 },
 itemTitle: {
   fontSize: 16,
   fontWeight: '500',
   color: '#000000',
   marginBottom: 2,
 },
 itemSubtitle: {
   fontSize: 14,
   color: '#8E8E93',
 },
 disabledItem: {
   opacity: 0.5,
 },
 disabledText: {
   color: '#C7C7CC',
 },
 footer: {
   paddingHorizontal: 16,
   paddingVertical: 20,
 },
 footerText: {
   fontSize: 14,
   color: '#8E8E93',
   textAlign: 'center',
   lineHeight: 20,
 },
});

export default NotificationsScreen;