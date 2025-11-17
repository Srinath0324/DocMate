import { View, Text, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FormSectionProps {
  title: string;
  iconName: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, iconName, children }) => {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>
        <Icon name={iconName} size={22} color="#0066CC" /> {title}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FormSection;
