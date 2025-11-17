import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton = ({ title, isActive, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#0066CC',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});

export default TabButton;
