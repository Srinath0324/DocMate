import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputText from '../textInput/InputText';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'DoctorTime' }) => {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <Text style={styles.logo}>{title}</Text>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>
      
      <InputText
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        placeholder="Search doctors, specialists, diseases..."
        leftIcon={<Ionicons name="search" size={20} color="#777" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: 3,
    top: 3,
    backgroundColor: '#FF3B30',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchContainer: {
    marginBottom: 0,
  },
  searchInputContainer: {
    backgroundColor: '#f0f0f0',
    borderWidth: 0,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 5,
  },
  searchInput: {
    height: 40,
    fontSize: 15,
    paddingHorizontal: 5,
  },
  filterButton: {
    padding: 5,
  },
});

export default Header;
