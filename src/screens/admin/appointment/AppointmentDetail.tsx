import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../components/button/Button';
import styles from './styles';

interface AppointmentDetailProps {
  navigation?: any;
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({ navigation }) => {
  // Mock data - in a real app, this would come from props or context
  const appointment = {
    id: 'AP1234567',
    type: 'online', // or 'onsite'
    status: 'upcoming', // or 'completed', 'cancelled'
    patient: {
      id: 'PT78901',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      age: 34,
      gender: 'Female',
      phone: '+1 (555) 123-4567',
    },
    date: '2023-09-15',
    time: '10:30 AM',
    duration: '30 mins',
    fee: '$120.00',
    doctor: {
      name: 'Dr. Michael Chen',
      specialization: 'Cardiologist',
    },
    disease: {
      name: 'Hypertension',
      description: 'Patient has been experiencing elevated blood pressure levels over the past month. Initial readings show 145/95 mmHg. Previous medication doesn\'t seem to be effective anymore.',
    },
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  const handleVideoCall = () => {
    navigation.navigate("AdminCreateMeeting")
  };

  const handleCancelAppointment = () => {
    // Implement cancel appointment functionality
    console.log('Cancelling appointment', appointment.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066CC" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Appointment Details</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Patient Information</Text>
          <View style={styles.patientRow}>
            <Image 
              source={{ uri: appointment.patient.avatar }} 
              style={styles.avatar} 
            />
            <View>
              <Text style={styles.patientName}>{appointment.patient.name}</Text>
              <Text style={styles.patientId}>ID: {appointment.patient.id}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="person" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Age/Gender:</Text>
            <Text style={styles.infoValue}>
              {appointment.patient.age} years, {appointment.patient.gender}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="phone" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{appointment.patient.phone}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appointment Information</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="event" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{formatDate(appointment.date)}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="access-time" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Time:</Text>
            <Text style={styles.infoValue}>{appointment.time} ({appointment.duration})</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="attach-money" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Fee:</Text>
            <Text style={styles.infoValue}>{appointment.fee}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="local-hospital" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Doctor:</Text>
            <Text style={styles.infoValue}>
              {appointment.doctor.name}
              <Text style={{ fontSize: 13, color: '#666' }}>
                {' '}({appointment.doctor.specialization})
              </Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="fiber-manual-record" size={20} color="#0066CC" />
            </View>
            <Text style={styles.infoLabel}>Status:</Text>
            <View style={
              appointment.status === 'upcoming' 
                ? styles.badgePending 
                : styles.badgeSuccess
            }>
              <Text style={styles.badgeText}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medical Condition</Text>
          <View style={styles.diseaseSection}>
            <Text style={styles.diseaseName}>{appointment.disease.name}</Text>
            <Text style={styles.diseaseDescription}>
              {appointment.disease.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        {appointment.type === 'online' && appointment.status === 'upcoming' && (
          <CustomButton
            title="Start Video Call"
            onPress={handleVideoCall}
            icon={<Icon name="videocam" size={20} color="#fff" style={{ marginRight: 8 }} />}
            size="large"
            fullWidth
          />
        )}
        
        {appointment.status === 'upcoming' && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancelAppointment}
          >
            <Icon name="cancel" size={20} color="#FF3B30" />
            <Text style={styles.cancelText}>Cancel Appointment</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AppointmentDetail;