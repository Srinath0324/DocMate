import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/FontAwesome';

interface DatePickerFieldProps {
  label: string;
  value: Date;
  displayValue: string;
  onChange: (date: Date) => void;
  error?: string;
  disabled?: boolean;
  maxDate?: Date;
}

const DatePickerField = ({
  label,
  value,
  displayValue,
  onChange,
  error,
  disabled = false,
  maxDate = new Date()
}: DatePickerFieldProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.field,
          disabled && styles.disabledField
        ]}
        onPress={() => !disabled && setShowDatePicker(true)}
        disabled={disabled}
      >
        <Feather name="calendar" size={20} color="#666" style={styles.icon} />
        <Text style={styles.valueText}>{displayValue || 'Select date'}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {showDatePicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={maxDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  field: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#e1e6ef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledField: {
    backgroundColor: '#f5f5f5',
    opacity: 0.8,
  },
  icon: {
    marginRight: 10,
  },
  valueText: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  }
});

export default DatePickerField;
