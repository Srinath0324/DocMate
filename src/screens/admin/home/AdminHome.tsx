import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockHomeAppointments, mockUser } from '../../../utils/Constants';
import { formatDate } from '../../../api/api';
import styles from './styles';

const HomeScreen = ({navigation}:any) => {
  const upcomingAppointments = mockHomeAppointments.filter(
    app => app.status === 'upcoming'
  );

  const latestAppointment = upcomingAppointments[0];
  const onsiteAppointments = upcomingAppointments.filter(
    app => app.type === 'onsite'
  );
  const onlineAppointments = upcomingAppointments.filter(
    app => app.type === 'online'
  );

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <TouchableOpacity style={styles.appointmentCard} onPress={() => navigation.navigate("AdminAppointmentDetail")}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.patientName}>{appointment.patientName}</Text>
        <Text style={styles.appointmentTime}>{appointment.time}</Text>
      </View>
      <Text style={styles.appointmentDate}>{formatDate(appointment.date)}</Text>
      {appointment.reason && (
        <Text style={styles.appointmentReason}>{appointment.reason}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: mockUser.profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeLabel}>Welcome back,</Text>
              <Text style={styles.userName}>{mockUser.name}</Text>
              {mockUser.specialization && (
                <Text style={styles.specialization}>{mockUser.specialization}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#2E86AB" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {latestAppointment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Appointment</Text>
            <View style={[styles.latestAppointmentCard,
            latestAppointment.type === 'online' ? styles.onlineCard : styles.onsiteCard]}>
              <View style={styles.appointmentTypeIndicator}>
                <Icon
                  name={latestAppointment.type === 'online' ? 'videocam' : 'place'}
                  size={20}
                  color="#fff"
                />
                <Text style={styles.typeText}>
                  {latestAppointment.type === 'online' ? 'Online' : 'On-site'}
                </Text>
              </View>
              <AppointmentCard appointment={latestAppointment} />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>On-site Appointments</Text>
            <Text style={styles.appointmentCount}>
              {onsiteAppointments.length} upcoming
            </Text>
          </View>
          {onsiteAppointments.length > 0 ? (
            onsiteAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming on-site appointments</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Online Appointments</Text>
            <Text style={styles.appointmentCount}>
              {onlineAppointments.length} upcoming
            </Text>
          </View>
          {onlineAppointments.length > 0 ? (
            onlineAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming online appointments</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
