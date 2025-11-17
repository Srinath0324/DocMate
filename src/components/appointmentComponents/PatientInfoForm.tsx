import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import InputText from '../textInput/InputText';

interface PatientInfoFormProps {
  patientType: string;
  type?: string,
  onPatientTypeChange: (type: string) => void;
  patientDetails: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    bloodGroup: string;
    weight: string;
    disease?: string;
    selectedDisease?: string;
    diseaseHistory?: string;
    [key: string]: any;
  };
  onInputChange: (field: string, value: string) => void;
  formErrors: {
    [key: string]: string;
  };
  dependents: Array<any>;
  selectedDependent: any;
  onDependentSelect: (dependent: any) => void;
}

const PatientInfoForm = (props: PatientInfoFormProps) => {
  const {
    patientType,
    type,
    onPatientTypeChange,
    patientDetails,
    onInputChange,
    formErrors,
    dependents,
    selectedDependent,
    onDependentSelect
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Patient Information</Text>

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => onPatientTypeChange('myself')}
        >
          <View style={styles.radioCircle}>
            {patientType === 'myself' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioLabel}>Myself</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => onPatientTypeChange('other')}
        >
          <View style={styles.radioCircle}>
            {patientType === 'other' && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioLabel}>Other</Text>
        </TouchableOpacity>
      </View>

      {patientType === 'other' && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedDependent ?
                `${selectedDependent.firstName} ${selectedDependent.lastName}` :
                'Select a dependent'}
            </Text>
            <Icon
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#0066CC"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownOverlay}>
              <ScrollView>
                {dependents.map((dependent, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      onDependentSelect(dependent);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>
                      {dependent.firstName} {dependent.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
                {dependents.length === 0 && (
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemText}>No dependents found</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      )}

      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <InputText
              label="First Name"
              value={patientDetails.firstName}
              onChangeText={(text) => onInputChange('firstName', text)}
              error={formErrors.firstName}
              editable={false}
              inputContainerStyle={styles.disabledInput}
            />
          </View>
          <View style={styles.halfWidth}>
            <InputText
              label="Last Name"
              value={patientDetails.lastName}
              onChangeText={(text) => onInputChange('lastName', text)}
              error={formErrors.lastName}
              editable={false}
              inputContainerStyle={styles.disabledInput}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <InputText
              label="Gender"
              value={patientDetails.gender}
              onChangeText={(text) => onInputChange('gender', text)}
              error={formErrors.gender}
              editable={false}
              inputContainerStyle={styles.disabledInput}
            />
          </View>
          <View style={styles.halfWidth}>
            <InputText
              label="Date of Birth"
              value={patientDetails.dob}
              onChangeText={(text) => onInputChange('dob', text)}
              placeholder="YYYY-MM-DD"
              error={formErrors.dob}
              editable={false}
              inputContainerStyle={styles.disabledInput}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <InputText
              label="Blood Type"
              value={patientDetails.bloodGroup}
              onChangeText={(text) => onInputChange('bloodGroup', text)}
              error={formErrors.bloodGroup}
              editable={false}
              inputContainerStyle={styles.disabledInput}
            />
          </View>
          <View style={styles.halfWidth}>
            <InputText
              label="Weight (kg)"
              value={patientDetails.weight}
              placeholder="Enter weight in kg"
              onChangeText={(text) => onInputChange('weight', text)}
              keyboardType="numeric"
              error={formErrors.weight}
            />
          </View>
        </View>

        {type == 'doctor' &&
          <>
            <InputText
              label="Disease"
              value={patientDetails.selectedDisease || patientDetails.disease || ''}
              onChangeText={(text) => onInputChange(patientDetails.hasOwnProperty('selectedDisease') ? 'selectedDisease' : 'disease', text)}
              placeholder="Enter any current disease"
              error={formErrors.selectedDisease || formErrors.disease}
            />

            <InputText
              label="Disease History"
              value={patientDetails.diseaseHistory}
              onChangeText={(text) => onInputChange('diseaseHistory', text)}
              multiline
              numberOfLines={3}
              placeholder="Describe any relevant medical history"
              error={formErrors.diseaseHistory}
            />
          </>}
      </View>
    </View>
  );
};

export default PatientInfoForm;
