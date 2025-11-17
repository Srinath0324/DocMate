import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

interface AppointmentCardProps {
  appointment: any;
  showReviewButton?: boolean;
  onReviewPress?: () => void;
  onCancelPress?: (appointmentId: string | number) => void;
}

const AppointmentCard = ({ 
  appointment, 
  showReviewButton = false,
  onReviewPress,
  onCancelPress
}: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return '#2A93D5';
      case 'Confirmed':
        return '#FF9800';
      case 'Complete':
        return '#4CAF50';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const showCancelButton = appointment.appointmentStatus === 'Pending' || appointment.appointmentStatus === 'Confirmed';

  return (
    <View
      style={styles.container}
     
    >
      <View style={styles.header}>
        <View style={[styles.statusContainer, { backgroundColor: `${getStatusColor(appointment.appointmentStatus)}20` }]}>
          <Text style={[styles.status, { color: getStatusColor(appointment.appointmentStatus) }]}>
            {appointment.appointmentStatus}
          </Text>
        </View>
        <Text style={styles.dateTime}>
          {`${appointment.day}, ${appointment.onlyDate} • ${appointment.onlyTime}`}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {appointment.doctorId ? (
          <View style={styles.doctorInfo}>
            {appointment.image ? (
              <Image source={{ uri: appointment.image }} style={styles.doctorImage} />
            ) : (
              <View style={[styles.doctorImage, styles.imagePlaceholder]}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
            )}
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.subInfo}>{appointment.doctorField.slice(2, 100)}</Text>
              <View style={styles.statRow}>
                <Text style={styles.fee}>Fee: {appointment.fee}</Text>
                {appointment.experience && (
                  <Text style={styles.experience}>{appointment.experience} exp.</Text>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.doctorInfo}>
            {appointment.image ? (
              <Image source={{ uri: appointment.image }} style={styles.doctorImage} />
            ) : (
              <View style={[styles.doctorImage, styles.imagePlaceholder]}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
            )}
            <View>
              <Text style={styles.facilityNameLarge}>
                {appointment.hospitalName || appointment.clinicName || appointment.labName}
              </Text>
              <Text style={styles.fee}>Fee: {appointment.fee}</Text>
            </View>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.patientInfo}>
          <Text style={styles.sectionTitle}>Patient Information:</Text>
          <View style={styles.patientRow}>
            <View style={styles.patientDetail}>
              <Text style={styles.patientLabel}>Name:</Text>
              <Text style={styles.patientValue}>{appointment.patientName}</Text>
            </View>
            <View style={styles.patientDetail}>
              <Text style={styles.patientLabel}>Age:</Text>
              <Text style={styles.patientValue}>{appointment.age} years</Text>
            </View>
          </View>

          <View style={styles.patientRow}>
            <View style={styles.patientDetail}>
              <Text style={styles.patientLabel}>Gender:</Text>
              <Text style={styles.patientValue}>{appointment.gender}</Text>
            </View>
            <View style={styles.patientDetail}>
              <Text style={styles.patientLabel}>Phone:</Text>
              <Text style={styles.patientValue}>{appointment.phoneNo}</Text>
            </View>
          </View>

          {appointment.disease && (
            <View style={styles.diseaseContainer}>
              <Text style={styles.patientLabel}>Disease:</Text>
              <Text style={styles.diseaseValue}>{appointment.disease}</Text>
            </View>
          )}
        </View>
        
        {showReviewButton && (
          <TouchableOpacity 
            style={styles.reviewButton} 
            onPress={onReviewPress}
            activeOpacity={0.7}
          >
            <FontAwesome name="star" size={16} color="#fff" style={styles.reviewIcon} />
            <Text style={styles.reviewButtonText}>Send Review</Text>
          </TouchableOpacity>
        )}
        
        {showCancelButton && onCancelPress && (
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => onCancelPress(appointment.appoinmentId)}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={16} color="#fff" style={styles.cancelIcon} />
            <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
