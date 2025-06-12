import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import DrawerNavigator que tendrá DashboardScreen como home
import DrawerNavigator from './DrawerNavigator';

// Import your screens for stack navigation
import PatientDetailScreen from '../screens/profile/PatientDetailScreen';
import AddPatientScreen from '../screens/profile/AddPatientScreen';
import EditPatientScreen from '../screens/profile/EditPatientScreen';
import AppointmentDetailScreen from '../screens/appointments/AppointmentDetailScreen';
import ScheduleAppointmentScreen from '../screens/appointments/ScheduleAppointmentScreen';
import MedicalRecordsScreen from '../screens/medical/MedicalRecordsScreen';
import PrescriptionsScreen from '../screens/medical/PrescriptionsScreen';
import DiagnosisScreen from '../screens/medical/DiagnosisScreen';
import TreatmentScreen from '../screens/medical/TreatmentScreen';

const Stack = createStackNavigator();

const DashboardNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerMain" // ← DrawerMain será la pantalla inicial
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Main drawer navigation - AQUÍ ESTÁ TU DASHBOARDSCREEN COMO HOME */}
      <Stack.Screen
        name="DrawerMain"
        component={DrawerNavigator} // ← DrawerNavigator tiene DashboardScreen como inicial
        options={{ headerShown: false }} // Sin header para que el drawer maneje todo
      />

      {/* Patient screens - Stack modals que se abren encima */}
      <Stack.Screen
        name="PatientDetail"
        component={PatientDetailScreen}
        options={{ title: 'Detalle del Paciente' }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatientScreen}
        options={{ title: 'Agregar Paciente' }}
      />
      <Stack.Screen
        name="EditPatient"
        component={EditPatientScreen}
        options={{ title: 'Editar Paciente' }}
      />

      {/* Appointment screens */}
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{ title: 'Detalle de Cita' }}
      />
      <Stack.Screen
        name="ScheduleAppointment"
        component={ScheduleAppointmentScreen}
        options={{ title: 'Agendar Cita' }}
      />

      {/* Medical screens */}
      <Stack.Screen
        name="MedicalRecords"
        component={MedicalRecordsScreen}
        options={{ title: 'Expediente Médico' }}
      />
      <Stack.Screen
        name="Prescriptions"
        component={PrescriptionsScreen}
        options={{ title: 'Recetas Médicas' }}
      />
      <Stack.Screen
        name="Diagnosis"
        component={DiagnosisScreen}
        options={{ title: 'Diagnósticos' }}
      />
      <Stack.Screen
        name="Treatment"
        component={TreatmentScreen}
        options={{ title: 'Tratamientos' }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;