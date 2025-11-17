import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dependent } from '../../hooks/useDependent';

interface DependentItemProps {
  item: Dependent;
  onDelete: (item: Dependent) => void;
}

const DependentItem: React.FC<DependentItemProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.dependentItem}>
      <View style={styles.dependentHeader}>
        <Text style={styles.dependentName}>{`${item.firstName} ${item.lastName}`}</Text>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <Icon name="trash" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.dependentDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailValue}>{item.gender}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date of Birth:</Text>
          <Text style={styles.detailValue}>
            {new Date(item.dob).toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>CNIC:</Text>
          <Text style={styles.detailValue}>{item.cnic}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Group:</Text>
          <Text style={styles.detailValue}>{item.bloodGroup}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dependentItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dependentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dependentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dependentDetails: {
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    width: 100,
    color: '#666',
    fontSize: 14,
  },
  detailValue: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  }
});

export default DependentItem;
