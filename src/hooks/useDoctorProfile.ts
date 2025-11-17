import { useState, useEffect } from 'react';
import { Platform, ToastAndroid, Alert } from 'react-native';
import { getDoctorAvailableTime, getDoctorById } from '../services/Get';
import moment from 'moment';

export const useDoctorProfile = (doctorId: string) => {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<any>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctorId]);

  useEffect(() => {
    if (selectedLocation && selectedDate) {
      fetchAvailableTimeSlots();
    }
  }, [selectedLocation, selectedDate]);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      const res = await getDoctorById(doctorId);
      let data = res.data;
      console.log('Doctor details:', data);
      setDoctor(data);
      if (data.hospitalClinicViewModels && data.hospitalClinicViewModels.length > 0) {
        setSelectedLocation(data.hospitalClinicViewModels[0]);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      showToast('Failed to load doctor profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTimeSlots = async () => {
    if (!selectedDate) return;
    
    try {
      setLoadingSlots(true);
      const data = await getDoctorAvailableTime(
        selectedLocation.clinicHospitalDoctorMappingId,
        selectedDate
      );
      console.log('Available time slots:', data);
      setTimeSlots(data.data);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      showToast('Failed to load available time slots');
    } finally {
      setLoadingSlots(false);
    }
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message);
    }
  };

  const handleLocationChange = (location: any) => {
    setSelectedLocation(location);
    setSelectedTimeSlot(null);
    if (!selectedDate) {
      setTimeSlots(null);
    }
  };

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    showToast(`Selected appointment at ${time}`);
  };
  
  const clearTimeSlots = () => {
    setSelectedDate(null); 
    setSelectedTimeSlot(null); 
    setTimeSlots(null); 
  };

  const renderAvailableDays = () => {
    const days = [];
    if (selectedLocation?.mon) days.push('Mon');
    if (selectedLocation?.tus) days.push('Tue');
    if (selectedLocation?.wed) days.push('Wed');
    if (selectedLocation?.thu) days.push('Thu');
    if (selectedLocation?.fri) days.push('Fri');
    if (selectedLocation?.sat) days.push('Sat');
    if (selectedLocation?.sun) days.push('Sun');

    return days;
  };

  const areAllSlotsUnavailable = (slots: any[]) => {
    if (!slots || slots.length === 0) return true;
    
    const now = moment();
    const today = moment().format('YYYY-MM-DD');
    const isToday = selectedDate === today;
    
    return slots.every(slot => {
      if (slot.status === 'NotAvailable') return true;
      
      if (isToday) {
        const slotTime = moment(`${today} ${slot.time}`, 'YYYY-MM-DD h:mm A');
        if (now.isAfter(slotTime)) return true;
      }
      
      if (slot.status === 'Past' || slot.status === 'Complete') return true;
      
      return false;
    });
  };

  const isSlotPast = (slotTime: string) => {
    const now = moment();
    const today = moment().format('YYYY-MM-DD');
    const isToday = selectedDate === today;
    
    if (!isToday) return false;
    
    const slotTimeMoment = moment(`${today} ${slotTime}`, 'YYYY-MM-DD h:mm A');
    return now.isAfter(slotTimeMoment);
  };

  return {
    loading,
    doctor,
    selectedLocation,
    showCalendar,
    selectedDate,
    timeSlots,
    loadingSlots,
    selectedTimeSlot,
    setShowCalendar,
    fetchDoctorDetails,
    handleLocationChange,
    handleDateSelect,
    handleTimeSlotSelect,
    clearTimeSlots,
    showToast,
    renderAvailableDays,
    areAllSlotsUnavailable,
    isSlotPast
  };
};
