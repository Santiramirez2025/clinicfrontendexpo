import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

// Import your screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import PatientListScreen from '../screens/profile/PatientListScreen';
import AppointmentListScreen from '../screens/appointments/AppointmentListScreen';
import MedicalRecordsScreen from '../screens/medical/MedicalRecordsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Temporary screens for missing ones
const AnalyticsScreen = () => (
  <View style={styles.tempScreen}>
    <Icon name="analytics" size={64} color="#007AFF" />
    <Text style={styles.tempTitle}>Analytics</Text>
    <Text style={styles.tempSubtitle}>Estadísticas y reportes próximamente</Text>
  </View>
);

const ReportsScreen = () => (
  <View style={styles.tempScreen}>
    <Icon name="assessment" size={64} color="#34C759" />
    <Text style={styles.tempTitle}>Reportes</Text>
    <Text style={styles.tempSubtitle}>Generación de reportes próximamente</Text>
  </View>
);

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
  };

  const menuItems = [
    { name: 'Home', label: 'Home', icon: 'home', component: 'Home' }, // ← Primero y principal
    { name: 'Patients', label: 'Pacientes', icon: 'people', component: 'Patients' },
    { name: 'Appointments', label: 'Citas', icon: 'event', component: 'Appointments' },
    { name: 'MedicalRecords', label: 'Expedientes', icon: 'folder', component: 'MedicalRecords' },
    { name: 'Analytics', label: 'Analytics', icon: 'analytics', component: 'Analytics' },
    { name: 'Reports', label: 'Reportes', icon: 'assessment', component: 'Reports' },
    { name: 'Settings', label: 'Configuración', icon: 'settings', component: 'Settings' },
  ];

  return (
    <View style={styles.drawerContainer}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.userAvatar}>
          <Icon name="person" size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'email@ejemplo.com'}</Text>
        {user?.role && (
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role.toUpperCase()}</Text>
          </View>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.component)}
          >
            <Icon name={item.icon} size={24} color="#6B7280" />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>ClinicSaasRN v1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home" // ← "Home" será tu DashboardScreen
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
      }}
    >
      {/* HOME - Tu DashboardScreen completo */}
      <Drawer.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          headerTitle: '🏥 ClinicSaasRN',
        }}
      />
      
      <Drawer.Screen
        name="Patients"
        component={PatientListScreen}
        options={{
          title: 'Pacientes',
        }}
      />
      
      <Drawer.Screen
        name="Appointments"
        component={AppointmentListScreen}
        options={{
          title: 'Citas Médicas',
        }}
      />
      
      <Drawer.Screen
        name="MedicalRecords"
        component={MedicalRecordsScreen}
        options={{
          title: 'Expedientes Médicos',
        }}
      />
      
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Analytics',
        }}
      />
      
      <Drawer.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          title: 'Reportes',
        }}
      />
      
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configuración',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
    fontWeight: '500',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 12,
    fontWeight: '500',
  },
  versionContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tempScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  tempTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  tempSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default DrawerNavigator;