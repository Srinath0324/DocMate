import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FacilitiesSelectorProps {
  facilities: any[];
  initialSelectedFacilities?: any[];
  maxSelections?: number;
  formError?: string;
  onFacilitiesChange: (facilities: any[], totalFee: number) => void;
}

const FacilitiesSelector: React.FC<FacilitiesSelectorProps> = ({
  facilities,
  initialSelectedFacilities = [],
  maxSelections = 5,
  formError,
  onFacilitiesChange,
}) => {
  const [selectedFacilities, setSelectedFacilities] = useState<any[]>(initialSelectedFacilities);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    if (initialSelectedFacilities.length > 0) {
      recalculateTotalFee(initialSelectedFacilities);
    }
  }, []);

  const handleSelectFacility = (facility: any) => {
    const facilityId = facility.facilityId;
    const isSelected = selectedFacilities.some((item: any) => item.facilityId === facilityId);

    let updatedFacilities;
    if (isSelected) {
      updatedFacilities = selectedFacilities.filter((item: any) => item.facilityId !== facilityId);
    } else {
      if (selectedFacilities.length >= maxSelections) {
        Alert.alert('Limit Reached', `You can select up to ${maxSelections} facilities only`);
        return;
      }
      updatedFacilities = [...selectedFacilities, facility];
    }

    setSelectedFacilities(updatedFacilities);
    const newTotalFee = recalculateTotalFee(updatedFacilities);
    onFacilitiesChange(updatedFacilities, newTotalFee);
  };

  const recalculateTotalFee = (facilities: any[]) => {
    const total = facilities.reduce((sum: number, facility: any) => {
      let feeValue = 0;
      if (facility?.fee) {
        const feeString = String(facility.fee).replace(/[^0-9.-]+/g, '');
        feeValue = parseFloat(feeString);
        if (isNaN(feeValue)) feeValue = 0;
      }
      return sum + feeValue;
    }, 0);

    setTotalFee(total);
    return total;
  };

  const isFacilitySelected = (facility: any) => {
    const facilityId = facility.id || facility.facilityId;
    return selectedFacilities.some((item: any) =>
      (item.id === facilityId) || (item.facilityId === facilityId)
    );
  };

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Select Facilities</Text>
      <Text style={styles.sectionSubtitle}>You can select up to {maxSelections} facilities</Text>

      {facilities && facilities.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalFacilitiesContainer}
        >
          {facilities.map((facility: any, index: number) => (
            <TouchableOpacity
              key={`facility-${index}`}
              style={[
                styles.facilityCardHorizontal,
                isFacilitySelected(facility) && styles.selectedFacilityCard
              ]}
              onPress={() => handleSelectFacility(facility)}
            >
              <View style={styles.facilityContent}>
                <Text style={styles.facilityName} numberOfLines={2}>{facility.name}</Text>
                <Text style={styles.facilityTypeText}>{facility.type}</Text>
                <Text style={styles.facilityFee}>{facility.fee}</Text>
              </View>

              {isFacilitySelected(facility) && (
                <View style={styles.selectionIndicator}>
                  <Icon name="check-circle" size={24} color="#0066CC" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noFacilitiesText}>No facilities available</Text>
      )}

      {formError && (
        <Text style={styles.errorMessage}>{formError}</Text>
      )}

      {selectedFacilities.length > 0 && (
        <View style={styles.totalFeeContainer}>
          <Text style={styles.totalFeeLabel}>Total Fee</Text>
          <Text style={styles.totalFeeValue}>{`₨ ${totalFee.toFixed(2)}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  horizontalFacilitiesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
  },
  facilityCardHorizontal: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 160,
    minHeight: 120,
    justifyContent: 'space-between',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedFacilityCard: {
    borderColor: '#0066CC',
    borderWidth: 2,
    backgroundColor: '#e6f0ff',
  },
  facilityContent: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  facilityTypeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  facilityFee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  noFacilitiesText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  totalFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalFeeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalFeeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
  },
});

export default FacilitiesSelector;
