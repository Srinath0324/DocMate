import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Modal,
  ActivityIndicator 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CityModelProps {
  visible: boolean;
  onClose: () => void;
  cities: any[];
  loading: boolean;
  citySearchKey: string;
  onSearch: (key: string) => void;
  onSelectCity: (city: any) => void;
}

const CityModel = ({
  visible,
  onClose,
  cities,
  loading,
  citySearchKey,
  onSearch,
  onSelectCity
}: CityModelProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select City</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalSearchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.modalSearchIcon} />
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Search for city"
              value={citySearchKey}
              onChangeText={onSearch}
              returnKeyType="search"
            />
          </View>
          
          {loading ? (
            <ActivityIndicator style={styles.citiesLoader} size="small" color="#2A93D5" />
          ) : (
            <FlatList
              data={cities}
              keyExtractor={(item: any, index) => {
                return item?.id ? item.id.toString() : `city-${index}`;
              }}
              renderItem={({ item }: any) => (
                <TouchableOpacity 
                  style={styles.cityItem}
                  onPress={() => onSelectCity(item)}
                >
                  <Text style={styles.cityItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyCityList}>
                  {citySearchKey ? "No cities found" : "No cities available"}
                </Text>
              }
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: '50%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  modalSearchIcon: {
    marginRight: 8,
  },
  modalSearchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  cityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cityItemText: {
    fontSize: 16,
    color: '#333',
  },
  citiesLoader: {
    marginVertical: 20,
  },
  emptyCityList: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
});

export default CityModel;
