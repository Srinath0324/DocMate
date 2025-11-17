import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import FormSection from '../../../components/form/FormSection';
import InputField from '../../../components/form/InputField';
import DaySelector from '../../../components/form/DaySelector';
import TimePicker from '../../../components/form/TimePicker';

const EditScreen = ({ route }: any) => {
  const [doctorInfo, setDoctorInfo] = useState({
    doctorField: 'Cardiology',
    aboutDoctor: 'Dr. Smith is a board-certified cardiologist with over 10 years of experience in treating heart conditions.',
    fees: '$150',
    doctorContact: '+1 (234) 567-8901',
  });

  const [availableDays, setAvailableDays] = useState(['Mon', 'Wed', 'Fri']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [availableTime, setAvailableTime] = useState('9:00 AM - 5:00 PM');

  useEffect(() => {
    if (route?.params?.site) {
      const site = route.params.site;
      setDoctorInfo({
        doctorField: site.doctorField || doctorInfo.doctorField,
        aboutDoctor: site.aboutDoctor || doctorInfo.aboutDoctor,
        fees: site.fees || doctorInfo.fees,
        doctorContact: site.doctorContact || doctorInfo.doctorContact,
      });
      
      if (site.availableDays) {
        setAvailableDays(site.availableDays);
      }
      
      if (site.availableTime) {
        setAvailableTime(site.availableTime);
      }
    }
  }, [route?.params?.site]);

  const handleChange = (field: string, value: string) => {
    setDoctorInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleTimeChange = (type: 'start' | 'end', time: string) => {
    if (type === 'start') {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
    
    updateAvailableTimeString();
  };

  const updateAvailableTimeString = () => {
    const formatTimeDisplay = (time24: string): string => {
      const [hours, minutes] = time24.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };
    
    const formattedStartTime = formatTimeDisplay(startTime);
    const formattedEndTime = formatTimeDisplay(endTime);
    setAvailableTime(`${formattedStartTime} - ${formattedEndTime}`);
  };

  const handleSave = () => {
    console.log('Saving doctor info:', { 
      ...doctorInfo, 
      availableDays, 
      availableTime 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Doctor Information</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={editStyles.formCard}></View>
          
          <FormSection title="Basic Information" iconName="person">
            <InputField
              label="Doctor Field"
              iconName="medical-services"
              value={doctorInfo.doctorField}
              onChangeText={(text) => handleChange('doctorField', text)}
              placeholder="e.g. Cardiology"
            />
            
            <InputField
              label="Fees"
              iconName="attach-money"
              value={doctorInfo.fees}
              onChangeText={(text) => handleChange('fees', text)}
              placeholder="e.g. $150"
              keyboardType="numeric"
            />
            
            <InputField
              label="Contact Number"
              iconName="phone"
              value={doctorInfo.doctorContact}
              onChangeText={(text) => handleChange('doctorContact', text)}
              placeholder="e.g. +1 (234) 567-8901"
              keyboardType="phone-pad"
            />
          </FormSection>

          <FormSection title="About Doctor" iconName="description">
            <InputField
              label=""
              iconName=""
              value={doctorInfo.aboutDoctor}
              onChangeText={(text) => handleChange('aboutDoctor', text)}
              placeholder="Describe doctor's qualifications and experience..."
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
            />
          </FormSection>

          <FormSection title="Availability" iconName="event-available">
            <DaySelector 
              selectedDays={availableDays}
              onToggleDay={toggleDay}
            />
            
            <TimePicker
              startTime={startTime}
              endTime={endTime}
              onTimeChange={handleTimeChange}
            />
          </FormSection>
          
          <TouchableOpacity 
            style={editStyles.saveButton} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Icon name="check-circle" size={24} color="#fff" />
            <Text style={editStyles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const editStyles = StyleSheet.create({
  formCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0066CC',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 30,
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default EditScreen;