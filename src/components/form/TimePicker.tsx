import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList 
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TimePickerProps {
  startTime: string;
  endTime: string;
  onTimeChange: (type: 'start' | 'end', time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ 
  startTime, 
  endTime, 
  onTimeChange 
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentTimeSelection, setCurrentTimeSelection] = useState<'start' | 'end'>('start');
  
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const formatTimeDisplay = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const openTimePicker = (type: 'start' | 'end') => {
    setCurrentTimeSelection(type);
    setShowTimePicker(true);
  };

  const setTime = (hour: string, minute: string) => {
    const newTime = `${hour}:${minute}`;
    onTimeChange(currentTimeSelection, newTime);
    setShowTimePicker(false);
  };

  return (
    <View>
      <Text style={styles.subSectionTitle}>Available Hours</Text>
      <View style={styles.timeSelectionContainer}>
        <TouchableOpacity 
          style={styles.timeBox}
          onPress={() => openTimePicker('start')}
        >
          <Icon name="access-time" size={20} color="#0066CC" style={styles.inputIcon} />
          <Text style={styles.timeText}>{formatTimeDisplay(startTime)}</Text>
          <Icon name="arrow-drop-down" size={24} color="#0066CC" />
        </TouchableOpacity>
        
        <Text style={styles.timeToText}>to</Text>
        
        <TouchableOpacity 
          style={styles.timeBox}
          onPress={() => openTimePicker('end')}
        >
          <Icon name="access-time" size={20} color="#0066CC" style={styles.inputIcon} />
          <Text style={styles.timeText}>{formatTimeDisplay(endTime)}</Text>
          <Icon name="arrow-drop-down" size={24} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowTimePicker(false)}
        >
          <View style={styles.timePickerContainer} onStartShouldSetResponder={() => true}>
            <View style={styles.timePickerHeader}>
              <Text style={styles.timePickerTitle}>
                Select {currentTimeSelection === 'start' ? 'Start' : 'End'} Time (24h)
              </Text>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <Icon name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.timePickerContent}>
              <View style={styles.timePickerColumn}>
                <Text style={styles.timeColumnHeader}>Hour</Text>
                <FlatList
                  data={hours}
                  keyExtractor={(item) => `hour-${item}`}
                  renderItem={({ item }) => {
                    const currentTime = currentTimeSelection === 'start' ? startTime : endTime;
                    const isSelected = currentTime.split(':')[0] === item;
                    
                    return (
                      <TouchableOpacity 
                        style={[
                          styles.timeItem,
                          isSelected && styles.timeItemSelected
                        ]}
                        onPress={() => {
                          const currentMinutes = currentTime.split(':')[1];
                          setTime(item, currentMinutes);
                        }}
                      >
                        <Text style={[
                          styles.timeItemText,
                          isSelected && styles.timeItemTextSelected
                        ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  style={styles.timePickerList}
                  initialScrollIndex={
                    parseInt(currentTimeSelection === 'start' 
                      ? startTime.split(':')[0] 
                      : endTime.split(':')[0])
                  }
                  getItemLayout={(data, index) => (
                    {length: 50, offset: 50 * index, index}
                  )}
                />
              </View>
              
              <View style={styles.timePickerColumn}>
                <Text style={styles.timeColumnHeader}>Minute</Text>
                <FlatList
                  data={minutes}
                  keyExtractor={(item) => `minute-${item}`}
                  renderItem={({ item }) => {
                    const currentTime = currentTimeSelection === 'start' ? startTime : endTime;
                    const isSelected = currentTime.split(':')[1] === item;
                    
                    return (
                      <TouchableOpacity 
                        style={[
                          styles.timeItem,
                          isSelected && styles.timeItemSelected
                        ]}
                        onPress={() => {
                          const currentHours = currentTime.split(':')[0];
                          setTime(currentHours, item);
                        }}
                      >
                        <Text style={[
                          styles.timeItemText,
                          isSelected && styles.timeItemTextSelected
                        ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  style={styles.timePickerList}
                  initialScrollIndex={
                    parseInt(currentTimeSelection === 'start' 
                      ? startTime.split(':')[1] 
                      : endTime.split(':')[1])
                  }
                  getItemLayout={(data, index) => (
                    {length: 50, offset: 50 * index, index}
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    padding: 12,
    height: 50,
  },
  timeToText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginHorizontal: 10,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '70%',
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timePickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 300,
  },
  timePickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  timeColumnHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 10,
  },
  timePickerList: {
    flex: 1,
  },
  timeItem: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  timeItemSelected: {
    backgroundColor: '#0066CC',
  },
  timeItemText: {
    fontSize: 18,
    color: '#333',
  },
  timeItemTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default TimePicker;
