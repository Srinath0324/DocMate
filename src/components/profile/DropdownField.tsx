import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/FontAwesome';

interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownFieldProps {
  label: string;
  value: DropdownItem;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const DropdownField = ({
  label,
  value,
  items,
  onSelect,
  placeholder = 'Select an option',
  error,
  disabled = false,
  icon
}: DropdownFieldProps) => {
  const [showModal, setShowModal] = useState(false);

  const renderDropdownItem = (item: DropdownItem) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        item.id === value.id && styles.selectedDropdownItem
      ]}
      onPress={() => {
        onSelect(item);
        setShowModal(false);
      }}
    >
      <Text style={[
        styles.dropdownItemText,
        item.id === value.id && styles.selectedDropdownItemText
      ]}>
        {item.name}
      </Text>
      {item.id === value.id && (
        <Feather name="check" size={20} color="#0066CC" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.field,
          disabled && styles.disabledField
        ]}
        onPress={() => !disabled && setShowModal(true)}
        disabled={disabled}
      >
        {icon}
        <Text style={styles.valueText}>
          {value.name || placeholder}
        </Text>
        {!disabled && <Feather name="chevron-down" size={20} color="#666" />}
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{`Select ${label}`}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
               <Icon name="times" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => renderDropdownItem(item)}
              style={styles.modalList}
            />
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalList: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 6,
  },
  selectedDropdownItem: {
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDropdownItemText: {
    fontWeight: 'bold',
    color: '#0066CC',
  }
});

export default DropdownField;
