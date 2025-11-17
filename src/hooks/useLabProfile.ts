import { useState, useEffect } from 'react';
import { Platform, ToastAndroid, Alert } from 'react-native';
import { getLabById, getLabFacilities, getLabAvailableTime } from '../services/Get';
import moment from 'moment';

export const useLabProfile = (labId: string) => {
  const [loading, setLoading] = useState(true);
  const [lab, setLab] = useState<any>(null);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<any>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [loadingFacilities, setLoadingFacilities] = useState(false);

  useEffect(() => {
    fetchLabDetails();
    fetchLabFacilities();
  }, [labId]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots();
    }
  }, [selectedDate]);

  const fetchLabDetails = async () => {
    try {
      setLoading(true);
      const res = await getLabById(labId);
      setLab(res.data);
    } catch (error) {
      console.error('Error fetching lab details:', error);
      showToast('Failed to load lab profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchLabFacilities = async () => {
    try {
      setLoadingFacilities(true);
      const res = await getLabFacilities(labId);
      console.log('Facilities:', res.data);
      setFacilities(res.data);
    } catch (error) {
      console.error('Error fetching lab facilities:', error);
      showToast('Failed to load lab facilities');
    } finally {
      setLoadingFacilities(false);
    }
  };

  const fetchAvailableTimeSlots = async () => {
    if (!selectedDate) return;
    
    try {
      setLoadingSlots(true);
      const data = await getLabAvailableTime(labId, selectedDate);
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
    if (lab?.mon) days.push('Mon');
    if (lab?.tus) days.push('Tue');
    if (lab?.wed) days.push('Wed');
    if (lab?.thur) days.push('Thu');
    if (lab?.fri) days.push('Fri');
    if (lab?.sat) days.push('Sat');
    if (lab?.sun) days.push('Sun');

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
    lab,
    facilities,
    loadingFacilities,
    showCalendar,
    selectedDate,
    timeSlots,
    loadingSlots,
    selectedTimeSlot,
    setShowCalendar,
    fetchLabDetails,
    fetchLabFacilities,
    handleDateSelect,
    handleTimeSlotSelect,
    clearTimeSlots,
    showToast,
    renderAvailableDays,
    areAllSlotsUnavailable,
    isSlotPast
  };
};
