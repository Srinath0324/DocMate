import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AppointmentCard from '../../../../components/appointmentCard/AppointmentCard';
import { useAppointments } from '../../../../context/AppointmentsContext';
import { cancelAppointment } from '../../../../services/Put';
import CancelAppointmentModal from '../../../../components/modals/CancelAppointmentModal';
import styles from './styles';

const UpComing = () => {
  const { loading, appointments, setAppointments } = useAppointments();
  const upcomingAppointments = appointments.upcoming;
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | number | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleCancelAppointment = (appointmentId: string | number) => {
    setSelectedAppointmentId(appointmentId);
    setModalVisible(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointmentId) return;
    
    try {
      setCancelLoading(true);
      await cancelAppointment(selectedAppointmentId);

      const updatedUpcoming = appointments.upcoming.filter(
        (app) => app.appoinmentId !== selectedAppointmentId
      );

      const canceledAppointment = appointments.upcoming.find(
        (app) => app.appoinmentId === selectedAppointmentId
      );

      if (canceledAppointment) {
        canceledAppointment.appointmentStatus = "Cancelled";

        setAppointments({
          ...appointments,
          upcoming: updatedUpcoming,
          cancelled: [...appointments.cancelled, canceledAppointment]
        });
      }

      setCancelLoading(false);
      setModalVisible(false);
      setSelectedAppointmentId(null);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setCancelLoading(false);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No upcoming appointments</Text>
      <Text style={styles.emptySubText}>Your upcoming appointments will appear here</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={upcomingAppointments}
        keyExtractor={(item, index) => `upcoming-${item.id || index}`}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onCancelPress={handleCancelAppointment}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
      
      <CancelAppointmentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirmCancel={handleConfirmCancel}
        loading={cancelLoading}
      />
    </View>
  );
};

export default UpComing;