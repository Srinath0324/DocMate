import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarModal from '../../../components/CalendarModal/CalendarModal';
import { useLabProfile } from '../../../hooks/useLabProfile';
import styles from './styles';
import CustomButton from '../../../components/button/Button';
import AppointmentTimeSelector from '../../../components/AppointmentTimeSelector/AppointmentTimeSelector';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import { getToken } from '../../../api/api';
import AuthRequiredModal from '../../../components/modals/AuthRequiredModal';

const LabProfile = ({ route, navigation }: any) => {
  const { id } = route.params || { Id: '' };
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const {
    loading,
    lab,
    facilities,
    loadingFacilities,
    showCalendar,
    selectedDate,
    timeSlots,
    loadingSlots,
    selectedTimeSlot,
    setShowCalendar,
    handleDateSelect,
    handleTimeSlotSelect,
    clearTimeSlots,
    renderAvailableDays,
    areAllSlotsUnavailable,
    isSlotPast
  } = useLabProfile(id);

  const handleLogin = () => {
    setAuthModalVisible(false);
    navigation.replace('Login', { returnTo: 'LabProfile', id: id });
  };

  const handleBookAppointment = () => {
    const token = getToken();
    if (!token) {
      setAuthModalVisible(true);
      return;
    }
    if (!selectedDate || !selectedTimeSlot) return;

    let time = selectedTimeSlot
    let date = selectedDate
    clearTimeSlots()
    navigation.navigate('LabAppointment', {
      labId: id,
      Name: lab.name,
      Image: lab.image,
      address: lab?.address,
      phoneNumber: lab?.phoneNumber,
      facilitiesL: facilities,
      selectedDate: date,
      selectedTime: time,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name={lab?.name}
          address={lab?.address}
          phoneNumber={lab?.phoneNumber}
          coverImage={lab?.coverImage}
          image={lab?.image}
          openingTime={lab?.openingTime}
          closingTime={lab?.closingTime}
          iconName="flask"
        />

        <View style={{ marginTop: 10 }} />
        <AppointmentTimeSelector
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          clearTimeSlots={clearTimeSlots}
          timeSlots={timeSlots}
          loadingSlots={loadingSlots}
          selectedTimeSlot={selectedTimeSlot}
          handleTimeSlotSelect={handleTimeSlotSelect}
          isSlotPast={isSlotPast}
          areAllSlotsUnavailable={areAllSlotsUnavailable}
          renderAvailableDays={renderAvailableDays}
        />

        {selectedDate && selectedTimeSlot && (
          <View style={styles.bookAppointmentContainer}>
            <CustomButton
              iconPosition='left'
              icon={<Icon name="calendar-check" size={22} color="#fff" />}
              title='Book Appointment'
              buttonStyle={{ gap: 5 }}
              onPress={() => handleBookAppointment()} />
          </View>
        )}

        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>Our Facilities</Text>
          {loadingFacilities ? (
            <ActivityIndicator size="small" color="#0066CC" style={{ marginVertical: 20 }} />
          ) : facilities.length > 0 ? (
            facilities.map((facility, index) => (
              <View key={index} style={styles.facilityCard}>
                <View style={styles.facilityTypeTag}>
                  <Text style={styles.facilityTypeText}>{facility.type}</Text>
                </View>
                <Text style={styles.facilityName}>{facility.name}</Text>
                <Text style={styles.facilityFee}>Fee: {facility.fee}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noFacilitiesContainer}>
              <Text style={styles.noFacilitiesText}>No facilities available for this lab</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
      <AuthRequiredModal
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
        onLogin={handleLogin}
      />
    </SafeAreaView>
  );
};

export default LabProfile;
