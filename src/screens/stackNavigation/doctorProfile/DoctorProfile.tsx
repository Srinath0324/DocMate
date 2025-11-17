import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHTML from 'react-native-render-html';
import CalendarModal from '../../../components/CalendarModal/CalendarModal';
import ReviewsSection from '../../../components/ReviewsSection/ReviewsSection';
import { useDoctorProfile } from '../../../hooks/useDoctorProfile';
import CustomButton from '../../../components/button/Button';
import AppointmentTimeSelector from '../../../components/AppointmentTimeSelector/AppointmentTimeSelector';
import { getToken } from '../../../api/api';
import AuthRequiredModal from '../../../components/modals/AuthRequiredModal';

const { width } = Dimensions.get('window');

const DoctorProfile = ({ route, navigation }: any) => {
  const { id } = route.params || { doctorId: '' };
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [consultationType, setConsultationType] = useState<'in-clinic' | 'online'>('in-clinic');

  const {
    loading,
    doctor,
    selectedLocation,
    showCalendar,
    selectedDate,
    timeSlots,
    loadingSlots,
    selectedTimeSlot,
    setShowCalendar,
    handleLocationChange,
    handleDateSelect,
    handleTimeSlotSelect,
    clearTimeSlots,
    showToast,
    renderAvailableDays,
    areAllSlotsUnavailable,
    isSlotPast
  } = useDoctorProfile(id);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Doctor not found</Text>
      </View>
    );
  }

  const handleBookAppointment = () => {
    const token = getToken();
    if (!token) {
      setAuthModalVisible(true);
      return;
    }

    if (!selectedDate || !selectedTimeSlot) return;


    let time = selectedTimeSlot
    let date = selectedDate;
    clearTimeSlots()
    navigation.navigate('doctorAppointment', {
      doctorName: doctor.name,
      doctorImage: doctor.image,
      doctorSpecialization: doctor.field,
      doctorExperience: doctor.experience,
      doctorRating: doctor.rating,
      appointmentFee: selectedLocation.fee,
      selectedDate: date,
      selectedTime: time,
      mappingId: selectedLocation.clinicHospitalDoctorMappingId,
      doctorId: id
    });
  };

  const handleLogin = () => {
    setAuthModalVisible(false);
    navigation.replace('Login', { returnTo: 'DoctorProfile', id: id });
  };

  const handleConsultationTypeChange = (type: 'in-clinic' | 'online') => {
    setConsultationType(type);
    if (type === 'online' ) {
      // Check if the user is authenticated before navigating
      const token = getToken();
      if (!token) {
        setAuthModalVisible(true);
        return;
      }
      // Navigate to Join Meeting screen
      navigation.navigate('JoinMeeting', { doctorId: id, doctorName: doctor.name });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: doctor.image }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialization}>
                {doctor.field} {doctor.fieldCategoryName ? `/ ${doctor.fieldCategoryName}` : ''}
              </Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <Icon name="briefcase-outline" size={16} color="#0066CC" />
                  </View>
                  <Text style={styles.detailText}>Experience: {doctor.experience}</Text>
                </View>

                {doctor.reviewCount != 0 &&
                  <View style={styles.detailItem}>
                    <View style={styles.detailIcon}>
                      <Icon name="star" size={16} color="#FFC107" />
                    </View>
                    <Text style={styles.detailText}>
                      Rating: {doctor.rating} ({doctor.reviewCount} {doctor.reviewCount === 1 ? 'review' : 'reviews'})
                    </Text>
                  </View>}

                {doctor.satisfiedPercent != 0 && <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <Icon name="thumb-up-outline" size={16} color="#4CAF50" />
                  </View>
                  <Text style={styles.detailText}>
                    {doctor.satisfiedPercent}% Satisfaction
                  </Text>
                </View>}
              </View>

              {doctor.isOnlineConsultantAvailable && (
                <View style={styles.onlineConsultTag}>
                  <Text style={styles.onlineConsultText}>Online Consultation Available</Text>
                </View>
              )}
            </View>
          </View>

          {doctor.description && (
            <View style={styles.description}>
              <RenderHTML
                source={{ html: doctor.description }}
                contentWidth={width - 32}
              />
            </View>
          )}
        </View>

        {/* Consultation Type Selection */}
        <View style={styles.consultationTypeContainer}>
          <Text style={styles.sectionTitle}>Consultation Type</Text>
          <View style={styles.consultationButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.consultationButton,
                consultationType === 'in-clinic' ? styles.activeConsultationButton : {}
              ]}
              onPress={() => handleConsultationTypeChange('in-clinic')}
            >
              <Icon name="hospital-building" size={20} color={consultationType === 'in-clinic' ? '#FFF' : '#0066CC'} />
              <Text style={[
                styles.consultationButtonText,
                consultationType === 'in-clinic' ? styles.activeConsultationButtonText : {}
              ]}>In-Clinic</Text>
            </TouchableOpacity>

            {/* {doctor.isOnlineConsultantAvailable && ( */}
              <TouchableOpacity
                style={[
                  styles.consultationButton,
                  consultationType === 'online' ? styles.activeConsultationButton : {}
                ]}
                onPress={() => handleConsultationTypeChange('online')}
              >
                <Icon name="video" size={20} color={consultationType === 'online' ? '#FFF' : '#0066CC'} />
                <Text style={[
                  styles.consultationButtonText,
                  consultationType === 'online' ? styles.activeConsultationButtonText : {}
                ]}>Online</Text>
              </TouchableOpacity>
           
          </View>
        </View>

        {consultationType === 'in-clinic' && doctor.hospitalClinicViewModels && doctor.hospitalClinicViewModels.length > 0 && (
          <View style={styles.hospitalsContainer}>
            <Text style={styles.sectionTitle}>Locations</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.buttonScrollView}
            >
              {doctor.hospitalClinicViewModels.map((location: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.locationButton,
                    selectedLocation?.clinicHospitalDoctorMappingId === location.clinicHospitalDoctorMappingId
                      ? styles.activeButton
                      : styles.inactiveButton,
                  ]}
                  onPress={() => handleLocationChange(location)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      selectedLocation?.clinicHospitalDoctorMappingId === location.clinicHospitalDoctorMappingId
                        ? styles.activeButtonText
                        : styles.inactiveButtonText,
                    ]}
                  >
                    {location.hospitalName || location.clinicName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedLocation && (
              <View style={styles.feeContainer}>
                <Text style={styles.feeText}>
                  Consultation Fee: Rs. {selectedLocation.fee}
                </Text>
              </View>
            )}
          </View>
        )}

        {consultationType === 'in-clinic' && selectedLocation && (
          <>
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
              openingTime={selectedLocation.openingTime}
              closingTime={selectedLocation.closingTime}
            />
          </>
        )}

        {consultationType === 'in-clinic' && selectedDate && selectedTimeSlot && (
          <View style={styles.bookAppointmentContainer}>
            <CustomButton
              iconPosition='left'
              icon={<Icon name="calendar-check" size={22} color="#fff" />}
              title='Book Appointment'
              buttonStyle={{ gap: 5 }}
              onPress={handleBookAppointment} />
          </View>
        )}

        <ReviewsSection
          doctorId={id}
          doctorName={doctor.name}
          showToast={showToast}
          navigation={navigation}
        />
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
    </View>
  );
};

export default DoctorProfile;