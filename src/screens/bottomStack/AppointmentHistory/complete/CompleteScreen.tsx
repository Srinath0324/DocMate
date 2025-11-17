import React, { useState, useEffect } from 'react';
import { View, Text,FlatList, ActivityIndicator } from 'react-native';
import AppointmentCard from '../../../../components/appointmentCard/AppointmentCard';
import { isReviewOnDoctor } from '../../../../services/Get';
import { useAppointments } from '../../../../context/AppointmentsContext';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const CompleteScreen = () => {
  const { loading, appointments } = useAppointments();
  const completeAppointments = appointments.complete;
  const navigation :any = useNavigation();
  const [appointmentsWithReviewStatus, setAppointmentsWithReviewStatus] = useState<any[]>([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const checkReviewStatus = async () => {
      if (completeAppointments.length === 0) {
        setLocalLoading(false);
        return;
      }

      try {
        const updatedAppointments = await Promise.all(
          completeAppointments.map(async (appointment: any) => {
            if (appointment.doctorId && appointment.appointmentStatus === 'Complete') {
              try {
                const reviewData = await isReviewOnDoctor(appointment.doctorId, appointment.userId);
                return { ...appointment, hasReview: reviewData.data };
              } catch (err) {
                return { ...appointment, hasReview: false };
              }
            }
            return appointment;
          })
        );
        setAppointmentsWithReviewStatus(updatedAppointments);
      } catch (error) {
        console.log('Error loading review status:', error);
        setAppointmentsWithReviewStatus(completeAppointments);
      } finally {
        setLocalLoading(false);
      }
    };

    checkReviewStatus();
  }, [completeAppointments]);

  const handleSendReview = (doctorId: string) => {
    if (doctorId) {
      navigation.navigate('SendReview', { doctorId });
    } else {
      console.error('Doctor ID or Appointment ID is missing');
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No completed appointments</Text>
      <Text style={styles.emptySubText}>Your completed appointments will appear here</Text>
    </View>
  );

  if (loading || localLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointmentsWithReviewStatus.length ? appointmentsWithReviewStatus : completeAppointments}
        keyExtractor={(item, index) => `complete-${item.id || index}`}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            showReviewButton={item.doctorId && item.appointmentStatus === 'Complete' && item.hasReview}
            onReviewPress={() => handleSendReview(item.doctorId)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default CompleteScreen;