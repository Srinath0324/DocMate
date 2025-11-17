import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppointmentCard from '../appointmentCard/AppointmentCard';

interface AppointmentListScreenProps {
  appointments: any;
  onCancelAppointment: (appointmentId: string | number) => void;
  showReviewOption?: boolean;
}

const AppointmentListScreen: React.FC<AppointmentListScreenProps> = ({ 
  appointments, 
  onCancelAppointment, 
  showReviewOption = false 
}) => {
  const renderAppointmentCard = ({ item }: { item: any }) => (
    <AppointmentCard
      appointment={item}
      showReviewButton={showReviewOption && item.appointmentStatus === 'Complete' && !item.isReviewed}
      onReviewPress={() => console.log('Review pressed for appointment:', item.appoinmentId)}
      onCancelPress={onCancelAppointment}
    />
  );

  if (appointments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No appointments found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={appointments}
      renderItem={renderAppointmentCard}
      keyExtractor={(item) => item.appoinmentId.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default AppointmentListScreen;
