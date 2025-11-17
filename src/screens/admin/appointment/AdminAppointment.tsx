import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UpcomingAppointments, CompletedAppointments, CanceledAppointments } from '../../../components/appointment/TabScreens';
import { mockAppointments } from '../../../utils/Constants';

const Tab = createMaterialTopTabNavigator();

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleCancelAppointment = (appointmentId: string | number) => {
    const appointment = appointments.find(app => app.appoinmentId === appointmentId);
    
    if (!appointment) return;

    if ((appointment.appointmentStatus === 'Pending' || appointment.appointmentStatus === 'Confirmed') && !appointment.isPaid) {
      Alert.alert(
        'Cancel Appointment',
        `Are you sure you want to cancel the appointment for ${appointment.patientName}?`,
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setAppointments(prevAppointments =>
                prevAppointments.map(app =>
                  app.appoinmentId === appointmentId
                    ? { ...app, appointmentStatus: 'Cancelled' }
                    : app
                )
              );
              Alert.alert('Success', 'Appointment has been cancelled successfully.');
            },
          },
        ]
      );
    } else if (appointment.isPaid) {
      Alert.alert('Cannot Cancel', 'Cannot cancel paid appointments. Please contact patient for refund process.');
    } else {
      Alert.alert('Cannot Cancel', 'This appointment cannot be cancelled.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#0066CC',
          tabBarInactiveTintColor: '#666',
          tabBarIndicatorStyle: { backgroundColor: '#0066CC' },
          tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen name="Upcoming">
          {() => <UpcomingAppointments 
            appointments={appointments} 
            onCancelAppointment={handleCancelAppointment} 
          />}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {() => <CompletedAppointments 
            appointments={appointments} 
            onCancelAppointment={handleCancelAppointment} 
          />}
        </Tab.Screen>
        <Tab.Screen name="Cancelled">
          {() => <CanceledAppointments 
            appointments={appointments} 
            onCancelAppointment={handleCancelAppointment} 
          />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 15,
  },
});

export default AdminAppointment;