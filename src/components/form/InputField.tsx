import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputFieldProps {
  label: string;
  iconName: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'auto'
}) => {
  
  if (multiline) {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            multiline={true}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
          />
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={20} color="#0066CC" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    padding: 12,
  },
  textArea: {
    fontSize: 15,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
  },
});

export default InputField;
