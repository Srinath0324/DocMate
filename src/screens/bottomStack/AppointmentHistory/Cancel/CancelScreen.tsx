import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AppointmentCard from '../../../../components/appointmentCard/AppointmentCard';
import { useAppointments } from '../../../../context/AppointmentsContext';
import styles from './styles';

const CancelScreen = () => {
  const { loading, appointments } = useAppointments();
  const cancelledAppointments = appointments.cancelled;

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No cancelled appointments</Text>
      <Text style={styles.emptySubText}>Your cancelled appointments will appear here</Text>
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
        data={cancelledAppointments}
        keyExtractor={(item, index) => `cancelled-${item.id || index}`}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default CancelScreen;