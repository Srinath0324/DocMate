import { useState, useEffect } from 'react';
import { Platform, ToastAndroid, Alert } from 'react-native';
import { getHospitalRadiologyTime, getHospitalParamedicalTime } from '../services/Get';
import moment from 'moment';

export const useHospitalTimeSlots = (hospitalId: string, type: 'radiology' | 'paramedical', facilityCategoryId?: string) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<any>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots();
    }
  }, [selectedDate]);

  const fetchAvailableTimeSlots = async () => {
    if (!selectedDate) return;
    
    try {
      setLoadingSlots(true);
      let data;
      
      if (type === 'radiology') {
        data = await getHospitalRadiologyTime(
          facilityCategoryId || hospitalId, 
          selectedDate
        );
      } else {
        data = await getHospitalParamedicalTime(
          hospitalId, 
          selectedDate
        );
      }
      
      console.log(`Available ${type} time slots:`, data);
      setTimeSlots(data.data);
    } catch (error) {
      console.error(`Error fetching ${type} time slots:`, error);
      showToast(`Failed to load available time slots for ${type}`);
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
    showCalendar,
    selectedDate,
    timeSlots,
    loadingSlots,
    selectedTimeSlot,
    setShowCalendar,
    handleDateSelect,
    handleTimeSlotSelect,
    clearTimeSlots,
    showToast,
    areAllSlotsUnavailable,
    isSlotPast
  };
};
