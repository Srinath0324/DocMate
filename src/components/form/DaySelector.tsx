import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface DaySelectorProps {
  selectedDays: string[];
  onToggleDay: (day: string) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDays, onToggleDay }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      <Text style={styles.subSectionTitle}>Available Days</Text>
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayChip,
              selectedDays.includes(day) && styles.activeDayChip
            ]}
            onPress={() => onToggleDay(day)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.dayText,
              selectedDays.includes(day) && styles.activeDayText
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeDayChip: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  activeDayText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default DaySelector;
