import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

const CustomHeader = ({ title, onBackPress, showBackButton = true }: CustomHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.rightPlaceholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 44 : 56,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 40,
  },
});

export default CustomHeader;
