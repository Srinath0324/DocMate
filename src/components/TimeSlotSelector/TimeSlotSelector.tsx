import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

interface TimeSlotSelectorProps {
  slots: any[];
  type: string;
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (time: string) => void;
  isSlotPast: (slotTime: string) => boolean;
  areAllSlotsUnavailable?: (slots: any[]) => boolean;
}

const TimeSlotSelector = ({
  slots,
  type,
  selectedTimeSlot,
  onTimeSlotSelect,
  isSlotPast,
  areAllSlotsUnavailable = () => false
}: TimeSlotSelectorProps) => {
  
  if (!slots || slots.length === 0) {
    return (
      <Text style={styles.noTimeSlotsText}>No {type} slots available</Text>
    );
  }

  if (areAllSlotsUnavailable(slots)) {
    return (
      <Text style={styles.noTimeSlotsText}>No available time slots for {type}</Text>
    );
  }

  return (
    <View style={styles.timeSlotContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollView}
      >
        {slots.map((slot, index) => {
          let slotStyle, textStyle, statusIcon = null;

          if (slot.status === 'NotAvailable') {
            return null;
          }

          if (isSlotPast(slot.time)) {
            return null;
          }

          const isSelected = selectedTimeSlot === slot.time;

          switch (slot.status) {
            case 'Available':
              slotStyle = isSelected ? styles.selectedSlot : styles.availableSlot;
              textStyle = isSelected ? styles.selectedSlotText : styles.availableSlotText;
              break;
            case "Panding":
              slotStyle = styles.pendingSlot;
              textStyle = styles.pendingSlotText;
              break;
            case "Booked":
              slotStyle = styles.completeSlot;
              textStyle = styles.completeSlotText;
              break;
            case 'Past':
              return null;
            default:
              slotStyle = isSelected ? styles.selectedSlot : styles.availableSlot;
              textStyle = isSelected ? styles.selectedSlotText : styles.availableSlotText;
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.timeSlot, slotStyle]}
              disabled={slot.status !== 'Available'}
              onPress={() => onTimeSlotSelect(slot.time)}
            >
              <Text style={[styles.timeSlotText, textStyle]}>{slot.time}</Text>
              {statusIcon}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TimeSlotSelector;
