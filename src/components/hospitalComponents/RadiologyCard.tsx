import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/button/Button';

interface RadiologyFacility {
  facilityId: string;
  name: string;
  fee: number;
}

interface RadiologyCategory {
  facilityCategoryId: string;
  facilityCategoryName: string;
  hospitalId: string;
  radiologyFacilities: RadiologyFacility[];
}

interface RadiologyCardProps {
  category: RadiologyCategory;
  onBookAppointment: () => void;
}

const RadiologyCard = ({ category, onBookAppointment }: RadiologyCardProps) => {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.categoryHeader}>{category.facilityCategoryName}</Text>
      
      {category.radiologyFacilities.map((facility, index) => (
        <View
          key={facility.facilityId}
          style={[
            styles.facilityRow,
            index !== category.radiologyFacilities.length - 1 && styles.facilityRowBorder
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
  categoryCard: {
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
  categoryHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
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
});

export default RadiologyCard;
