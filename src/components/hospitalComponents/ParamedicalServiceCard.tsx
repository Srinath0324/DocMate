import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/button/Button';

interface Facility {
  facilityId: string;
  name: string;
  fee: number;
  type?: string;
  typeId?: number;
}

interface ParamedicalServiceCardProps {
  facilities: Facility[];
  onBookAppointment: () => void;
}

const ParamedicalServiceCard = ({ facilities, onBookAppointment }: ParamedicalServiceCardProps) => {
  if (facilities.length === 0) {
    return (
      <View style={styles.serviceCard}>
        <View style={styles.noContentContainer}>
          <Text style={styles.noContentText}>No paramedical services available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.serviceCard}>
      {facilities.map((facility, index) => (
        <View
          key={facility.facilityId}
          style={[
            styles.facilityRow,
            index !== facilities.length - 1 && styles.facilityRowBorder
          ]}
        >
          <Text style={styles.facilityRowName}>{facility.name}</Text>
          <Text style={styles.facilityRowFee}>Rs. {facility.fee}</Text>
        </View>
      ))}
      <CustomButton
        iconPosition='left'
        icon={<Icon name="calendar-check" size={22} color="#fff" />}
        title='Book Appointment'
        buttonStyle={{ gap: 5 }}
        onPress={onBookAppointment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  facilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  facilityRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  facilityRowName: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    paddingRight: 8,
  },
  facilityRowFee: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0066CC',
  },
  noContentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noContentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ParamedicalServiceCard;
