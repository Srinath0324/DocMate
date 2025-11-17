import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import styles from './styles';
import CustomButton from '../../../components/button/Button';
import { getUserPersonalDetail, getUserPatients, bookDoctorAppointment } from '../../../services/Get';
import DetailHeader from '../../../components/appointmentComponents/DetailHeader';
import PatientInfoForm from '../../../components/appointmentComponents/PatientInfoForm';
import BookAppointmentConfirmModal from '../../../components/modals/BookAppointmentConfirmModal';
import AppointmentSuccessModal from '../../../components/modals/AppointmentSuccessModal';

const DoctorAppointment = ({ route, navigation }: any) => {
  const {
    doctorName,
    doctorImage,
    doctorSpecialization,
    doctorExperience,
    doctorRating,
    appointmentFee,
    selectedDate,
    selectedTime,
    mappingId,
    doctorId
  } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [patientType, setPatientType] = useState('myself');
  const [userDetail, setUserDetail] = useState<any>(null);
  const [dependents, setDependents] = useState<any[]>([]);
  const [selectedDependent, setSelectedDependent] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});

  // New state variables for modals
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    weight: '',
    diseaseHistory: '',
    selectedDisease: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userResponse = await getUserPersonalDetail();
        console.log('User detail response:', userResponse);
        setUserDetail(userResponse.data);

        if (userResponse.data) {
          const userData = userResponse.data;
          setPatientForm({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            gender: userData.gender || '',
            dob: userData.dob ? moment(userData.dob).format('YYYY-MM-DD') : '',
            bloodGroup: userData.bloodGroup || '',
            weight: '',
            diseaseHistory: '',
            selectedDisease: ''
          });
        }

        const dependentsResponse = await getUserPatients();
        setDependents(dependentsResponse.data || []);

      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePatientTypeChange = (type: string) => {
    setPatientType(type);

    if (type === 'myself' && userDetail) {
      setPatientForm({
        firstName: userDetail.firstName || '',
        lastName: userDetail.lastName || '',
        gender: userDetail.gender || '',
        dob: userDetail.dob ? moment(userDetail.dob).format('YYYY-MM-DD') : '',
        bloodGroup: userDetail.bloodGroup || '',
        weight: '',
        diseaseHistory: '',
        selectedDisease: ''
      });
      setSelectedDependent(null);
    } else {
      if (!selectedDependent) {
        setPatientForm({
          firstName: '',
          lastName: '',
          gender: '',
          dob: '',
          bloodGroup: '',
          weight: '',
          diseaseHistory: '',
          selectedDisease: ''
        });
      }
    }
  };

  const handleDependentSelect = (dependent: any) => {
    setSelectedDependent(dependent);

    setPatientForm({
      firstName: dependent.firstName || '',
      lastName: dependent.lastName || '',
      gender: dependent.gender || '',
      dob: dependent.dob ? moment(dependent.dob).format('YYYY-MM-DD') : '',
      bloodGroup: dependent.bloodGroup || '',
      weight: '',
      diseaseHistory: '',
      selectedDisease: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setPatientForm(prev => ({
      ...prev,
      [field]: value
    }));

    if (formErrors[field]) {
      setFormErrors((prev: any) => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const errors: any = {};

    if (!patientForm.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!patientForm.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!patientForm.gender.trim()) {
      errors.gender = 'Gender is required';
    }

    if (!patientForm.dob.trim()) {
      errors.dob = 'Date of birth is required';
    } else {
      const dobDate = moment(patientForm.dob);
      if (!dobDate.isValid()) {
        errors.dob = 'Invalid date format';
      } else if (dobDate.isAfter(moment())) {
        errors.dob = 'Date of birth cannot be in the future';
      }
    }

    if (!patientForm.bloodGroup.trim()) {
      errors.bloodGroup = 'Blood group is required';
    }

    if (!patientForm.weight.trim()) {
      errors.weight = 'Weight is required';
    } else {
      const weightValue = parseFloat(patientForm.weight);
      if (isNaN(weightValue) || weightValue <= 0) {
        errors.weight = 'Weight must be a positive number';
      }
    }

    if (!patientForm.selectedDisease.trim()) {
      errors.selectedDisease = 'Disease information is required';
    }

    if (!patientForm.diseaseHistory.trim()) {
      errors.diseaseHistory = 'Disease history is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setConfirmModalVisible(true);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      setBookingLoading(true);

      const patientId = patientType === 'myself'
        ? userDetail.patientId
        : (selectedDependent ? selectedDependent.patientId : null);

      const dateStr = moment(selectedDate).format('YYYY-MM-DD');
      const localDateTime = moment(`${dateStr} ${selectedTime}`, 'YYYY-MM-DD h:mm A');
      const appointmentDateTime = localDateTime.format('YYYY-MM-DDTHH:mm:ss') + `.772`;

      const appointmentData = {
        disease: patientForm.selectedDisease,
        diseaseInPast: patientForm.diseaseHistory || "N/A",
        timming: appointmentDateTime,
        patientId: patientId,
        weight: parseFloat(patientForm.weight),
      };

      const response = await bookDoctorAppointment(mappingId, appointmentData);

      setConfirmModalVisible(false);
      setSuccessModalVisible(true);

    } catch (error) {
      console.log("Error booking appointment:", error);
      setConfirmModalVisible(false);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    navigation.replace('BottomTabs', { screen: 'AppointmentHistory' });
  };

  const paymentNaivagte = () => {
    setSuccessModalVisible(false);
    navigation.replace('Payment');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DetailHeader
          type="doctor"
          name={doctorName}
          image={doctorImage}
          specialization={doctorSpecialization}
          experience={doctorExperience}
          rating={doctorRating}
          appointmentFee={appointmentFee}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <ActivityIndicator size="large" color="#0066CC" />
          </View>
        ) : (
          <PatientInfoForm
            type='doctor'
            patientType={patientType}
            onPatientTypeChange={handlePatientTypeChange}
            patientDetails={patientForm}
            onInputChange={handleInputChange}
            formErrors={formErrors}
            dependents={dependents}
            selectedDependent={selectedDependent}
            onDependentSelect={handleDependentSelect}
          />
        )}
      </ScrollView>

      <View style={styles.submitButtonContainer}>
        <CustomButton
          title="Book Appointment"
          onPress={handleSubmit}
          buttonStyle={{ gap: 5 }}
          icon={<Icon name="calendar-plus" size={20} color="#fff" />}
          iconPosition="left"
        />
      </View>

      <BookAppointmentConfirmModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmBooking}
        doctorName={doctorName}
        doctorImage={doctorImage}
        doctorSpecialization={doctorSpecialization}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        appointmentFee={appointmentFee}
        loading={bookingLoading}
      />

      <AppointmentSuccessModal
        visible={successModalVisible}
        onClose={handleSuccessModalClose}
        onGoToPayment={paymentNaivagte}
        type='doctor'
      />
    </View>
  );
};

export default DoctorAppointment;