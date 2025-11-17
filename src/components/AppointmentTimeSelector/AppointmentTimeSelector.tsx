import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import TimeSlotSelector from '../TimeSlotSelector/TimeSlotSelector';

interface AppointmentTimeSelectorProps {
  title?: string;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  selectedDate: string | null;
  clearTimeSlots: () => void;
  timeSlots: any;
  loadingSlots: boolean;
  selectedTimeSlot: string | null;
  handleTimeSlotSelect: (time: string) => void;
  isSlotPast: (slotTime: string) => boolean;
  areAllSlotsUnavailable: (slots: any[]) => boolean;
  renderAvailableDays: () => string[];
  dateError?: string;
  timeError?: string;
  openingTime?: string;
  closingTime?: string;
}

const AppointmentTimeSelector = ({
  title = "Available Days & Time",
  showCalendar,
  setShowCalendar,
  selectedDate,
  clearTimeSlots,
  timeSlots,
  loadingSlots,
  selectedTimeSlot,
  handleTimeSlotSelect,
  isSlotPast,
  areAllSlotsUnavailable,
  dateError,
  timeError,
  renderAvailableDays,
  openingTime,
  closingTime,
}: AppointmentTimeSelectorProps) => {
  return (
    <View style={styles.availabilitySection}>
      <View style={styles.availabilityHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setShowCalendar(true)}
        >
          <Icon name="calendar" size={24} color="#0066CC" />
        </TouchableOpacity>
      </View>


      <View style={styles.daysContainer}>
        {renderAvailableDays().map((day, index) => (
          <View key={index} style={styles.dayTag}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      {openingTime && closingTime && (
        <Text style={styles.timeText}>
          {moment(openingTime).format('h:mm A')} - {moment(closingTime).format('h:mm A')}
        </Text>
      )}

      {selectedDate ? (
        <View style={styles.selectedDateContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Icon name="calendar-check" size={18} color="#0066CC" style={styles.selectedDateIcon} />
            <Text style={styles.selectedDateText}>
              {moment(selectedDate).format('dddd, MMM D, YYYY')}
            </Text>
          </View>
          <TouchableOpacity onPress={clearTimeSlots} style={styles.clearButton}>
            <Icon name="close-circle" size={22} color="#FF5252" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noDateContainer}>
          <Text style={styles.noDateText}>
            Please select a date to view available time slots
          </Text>
        </View>
      )}

      {dateError && (
        <Text style={styles.errorText}>
          {dateError}
        </Text>
      )}

      {selectedDate && (
        loadingSlots ? (
          <ActivityIndicator size="small" color="#0066CC" style={{ marginVertical: 20 }} />
        ) : (
          timeSlots && (
            <View style={styles.timeSlotsWrapper}>
              <View style={styles.timeSectionHeader}>
                <Icon name="weather-sunny" size={18} color="#0066CC" />
                <Text style={styles.timeSectionTitle}>Morning</Text>
              </View>
              <TimeSlotSelector
                slots={timeSlots.morningTime}
                type="morning"
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={handleTimeSlotSelect}
                isSlotPast={isSlotPast}
                areAllSlotsUnavailable={areAllSlotsUnavailable}
              />

              <View style={styles.timeSectionHeader}>
                <Icon name="weather-night" size={18} color="#0066CC" />
                <Text style={styles.timeSectionTitle}>Evening</Text>
              </View>
              <TimeSlotSelector
                slots={timeSlots.eveningTime}
                type="evening"
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={handleTimeSlotSelect}
                isSlotPast={isSlotPast}
                areAllSlotsUnavailable={areAllSlotsUnavailable}
              />
            </View>
          )
        )
      )}

      {timeError && (
        <Text style={styles.errorText}>
          {timeError}
        </Text>
      )}
    </View>
  );
};

export default AppointmentTimeSelector;
