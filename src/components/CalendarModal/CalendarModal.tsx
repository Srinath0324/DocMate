import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (day: any) => void;
  selectedDate: string | null;
}

const CalendarModal = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate,
}: CalendarModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Calendar
              minDate={moment().format('YYYY-MM-DD')}
              maxDate={moment().add(30, 'days').format('YYYY-MM-DD')}
              onDayPress={onDateSelect}
              markedDates={
                selectedDate ? {
                  [selectedDate]: { selected: true, selectedColor: '#0066CC' }
                } : {}
              }
              theme={{
                todayTextColor: '#0066CC',
                arrowColor: '#0066CC',
                dotColor: '#0066CC',
                selectedDayBackgroundColor: '#0066CC',
                dayTextColor: '#333',
                textDayFontFamily: 'System',
                textMonthFontFamily: 'System',
                textDayHeaderFontFamily: 'System',
                textDayFontWeight: '400',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '600',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14
              }}
              enableSwipeMonths={true}
            />
            
            <TouchableOpacity 
              style={styles.selectDateButton} 
              onPress={onClose}
            >
              <Text style={styles.selectDateButtonText}>
                {selectedDate ? 'Confirm Date' : 'Cancel'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CalendarModal;
