import { View, Text, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../../../components/appointmentComponents/DetailHeader'
import PatientInfoForm from '../../../components/appointmentComponents/PatientInfoForm';
import { bookFacilitiesAppointment, getUserPatients, getUserPersonalDetail } from '../../../services/Get';
import moment from 'moment';
import FacilitiesSelector from '../../../components/appointmentComponents/FacilitiesSelector';
import styles from './styles';
import CustomButton from '../../../components/button/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHospitalTimeSlots } from '../../../hooks/useHospitalTimeSlots';
import CalendarModal from '../../../components/CalendarModal/CalendarModal';
import AppointmentTimeSelector from '../../../components/AppointmentTimeSelector/AppointmentTimeSelector';
import BookAppointmentConfirmModal from '../../../components/modals/BookAppointmentConfirmModal';
import AppointmentSuccessModal from '../../../components/modals/AppointmentSuccessModal';

const HospitalAppointment = ({ route, navigation }: any) => {
    const { hospitalId, Name, Image, address, phoneNumber, facilitiesL, type, facilityCategoryId, getWorkingDay } = route.params;
    const [userDetails, setUserDetails] = useState<any>(null);
    const [dependents, setDependents] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDependent, setSelectedDependent] = useState<any>(null);
    const [formErrors, setFormErrors] = useState<any>({});
    const [patientOption, setPatientOption] = useState('myself');
    const [selectedFacilities, setSelectedFacilities] = useState<any[]>([]);
    const [totalFee, setTotalFee] = useState(0);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    const {
        showCalendar,
        selectedDate,
        timeSlots,
        loadingSlots,
        selectedTimeSlot,
        setShowCalendar,
        handleDateSelect,
        handleTimeSlotSelect,
        clearTimeSlots,
        areAllSlotsUnavailable,
        isSlotPast
    } = useHospitalTimeSlots(
        hospitalId,
        type === 'radiology' ? 'radiology' : 'paramedical',
        facilityCategoryId
    );

    const [patientDetails, setPatientDetails] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        weight: '',
        bloodGroup: '',
        patientId: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userResponse = await getUserPersonalDetail();
                if (userResponse?.data) {
                    const userData = userResponse.data;
                    setUserDetails(userData);
                    setPatientDetails({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        gender: userData.gender || '',
                        dob: userData.dob ? moment(userData.dob).format('YYYY-MM-DD') : '',
                        weight: '',
                        bloodGroup: userData.bloodGroup || '',
                        patientId: userData.patientId || userData.userId
                    });
                }

                const dependentsResponse = await getUserPatients();
                if (dependentsResponse?.data) {
                    setDependents(dependentsResponse.data);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePatientOptionChange = (option: any) => {
        setPatientOption(option);
        setFormErrors({});

        if (option === 'myself' && userDetails) {
            setPatientDetails({
                firstName: userDetails.firstName || '',
                lastName: userDetails.lastName || '',
                gender: userDetails.gender || '',
                dob: userDetails.dob ? moment(userDetails.dob).format('YYYY-MM-DD') : '',
                weight: '',
                bloodGroup: userDetails.bloodGroup || '',
                patientId: userDetails.patientId || userDetails.userId,
            });
            setSelectedDependent(null);
        }
    };

    const handleDependentChange = (dependent: any) => {
        setSelectedDependent(dependent);
        setFormErrors({});

        if (dependent) {
            setPatientDetails({
                firstName: dependent.firstName || '',
                lastName: dependent.lastName || '',
                gender: dependent.gender || '',
                dob: dependent.dob ? moment(dependent.dob).format('YYYY-MM-DD') : '',
                weight: '',
                bloodGroup: dependent.bloodGroup || '',
                patientId: dependent.patientId || '',
            });
        }
    };

    const handleInputChange = (field: any, value: any) => {
        setPatientDetails(prev => ({
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

    const handleFacilitiesChange = (facilities: any[], fee: number) => {
        setSelectedFacilities(facilities);
        setTotalFee(fee);
    };

    const validateForm = () => {
        const errors: any = {};

        if (!selectedDate) {
            errors.date = 'Please select an appointment date';
        }

        if (!selectedTimeSlot) {
            errors.time = 'Please select an appointment time';
        }

        if (!patientDetails.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!patientDetails.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!patientDetails.gender) {
            errors.gender = 'Gender is required';
        }

        if (!patientDetails.weight.trim()) {
            errors.weight = 'Weight is required';
        } else {
            const weightValue = parseFloat(patientDetails.weight);
            if (isNaN(weightValue) || weightValue <= 0) {
                errors.weight = 'Weight must be a positive number';
            }
        }

        if (selectedFacilities.length === 0) {
            errors.facilities = 'Please select at least one facility';
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
        setBookingLoading(true);
        try {
            const dateStr = moment(selectedDate).format('YYYY-MM-DD');
            const localDateTime = moment(`${dateStr} ${selectedTimeSlot}`, 'YYYY-MM-DD h:mm A');
            const appointmentDateTime = localDateTime.format('YYYY-MM-DDTHH:mm:ss') + `.772`;
            const appointmentData = {
                facilityIds: selectedFacilities.map((facility: any) => facility.facilityId),
                timming: appointmentDateTime,
                patientId: patientDetails.patientId,
                weight: patientDetails.weight
            };
            await bookFacilitiesAppointment(appointmentData);
            setBookingLoading(false);
            setConfirmModalVisible(false);
            setSuccessModalVisible(true);
        } catch (error) {
            setConfirmModalVisible(false);
            setBookingLoading(false);
            console.error("Error booking appointment:", error);
            Alert.alert('Error', 'Failed to book appointment');
        }
    }

    const handleSuccessModalClose = () => {
        setSuccessModalVisible(false);
        navigation.replace('BottomTabs', { screen: 'AppointmentHistory' });
    };

    const paymentNaivagte = () => {
        setSuccessModalVisible(false);
        navigation.replace('Payment');
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DetailHeader
                    type="hos"
                    name={Name}
                    image={Image}
                    address={address}
                    phoneNumber={phoneNumber}
                />
                <View style={{ marginTop: 10 }} />
                <AppointmentTimeSelector
                    title="Select Appointment Time"
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
                    dateError={formErrors.date}
                    timeError={formErrors.time}
                    renderAvailableDays={getWorkingDay}
                />
                <View style={{
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                }} />
                <FacilitiesSelector
                    facilities={facilitiesL || []}
                    initialSelectedFacilities={selectedFacilities}
                    maxSelections={5}
                    formError={formErrors.facilities}
                    onFacilitiesChange={handleFacilitiesChange}
                />
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <ActivityIndicator size="large" color="#0066CC" />
                    </View>
                ) : (
                    <PatientInfoForm
                        patientType={patientOption}
                        onPatientTypeChange={handlePatientOptionChange}
                        patientDetails={patientDetails}
                        onInputChange={handleInputChange}
                        formErrors={formErrors}
                        dependents={dependents}
                        selectedDependent={selectedDependent}
                        onDependentSelect={handleDependentChange}
                    />)}
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

            <CalendarModal
                visible={showCalendar}
                onClose={() => setShowCalendar(false)}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
            />

            <BookAppointmentConfirmModal
                visible={confirmModalVisible}
                onClose={() => setConfirmModalVisible(false)}
                onConfirm={handleConfirmBooking}
                doctorName={Name}
                doctorImage={Image}
                selectedDate={selectedDate}
                selectedTime={selectedTimeSlot}
                appointmentFee={totalFee}
                loading={bookingLoading}
            />

            <AppointmentSuccessModal
                visible={successModalVisible}
                onClose={handleSuccessModalClose}
                onGoToPayment={paymentNaivagte}
            />
        </SafeAreaView>
    )
}

export default HospitalAppointment