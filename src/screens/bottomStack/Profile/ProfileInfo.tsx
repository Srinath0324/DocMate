import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { logOut } from '../../../api/api';
import InputText from '../../../components/textInput/InputText';
import CustomButton from '../../../components/button/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useProfileData } from '../../../hooks/useProfileData';
import DropdownField from '../../../components/profile/DropdownField';
import DatePickerField from '../../../components/profile/DatePickerField';
import { formatCNIC } from '../../../utils/Validations';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileInfo = ({ navigation }: any) => {
  const {
    loading,
    saving,
    isEditing,
    setIsEditing,
    profileData,
    errors,
    bloodGroups,
    genderTypes,
    updateField,
    updateDate,
    updateProfile
  } = useProfileData();

  const handleCNICChange = (text: string) => {
    const formattedCNIC = formatCNIC(text);
    updateField('cnic', formattedCNIC);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logOut();
            navigation.replace('Login');
          }
        }
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Loading profile information...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <InputText
            label="First Name"
            value={profileData.firstName}
            onChangeText={(text) => updateField('firstName', text)}
            placeholder="Enter your first name"
            editable={isEditing}
            error={errors.firstName}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputContainerStyle={[
              styles.inputField,
              !isEditing && styles.disabledInput
            ]}
            leftIcon={<FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />}
          />

          <InputText
            label="Last Name"
            value={profileData.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            placeholder="Enter your last name"
            editable={isEditing}
            error={errors.lastName}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputContainerStyle={[
              styles.inputField,
              !isEditing && styles.disabledInput
            ]}
            leftIcon={<FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />}
          />

          <DatePickerField
            label="Date of Birth"
            value={profileData.dob}
            displayValue={profileData.dobString}
            onChange={updateDate}
            error={errors.dob}
            disabled={!isEditing}
            maxDate={new Date()}
          />

          <InputText
            label="CNIC"
            value={profileData.cnic}
            onChangeText={handleCNICChange}
            placeholder="12345-1234567-1"
            editable={isEditing}
            error={errors.cnic}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputContainerStyle={[
              styles.inputField,
              !isEditing && styles.disabledInput
            ]}
            leftIcon={<FontAwesome name="credit-card" size={20} color="#666" style={styles.inputIcon} />}
          />

          <DropdownField
            label="Blood Group"
            value={profileData.bloodGroup}
            items={bloodGroups}
            onSelect={(bloodGroup) => updateField('bloodGroup', bloodGroup)}
            placeholder="Select blood group"
            error={errors.bloodGroup}
            disabled={!isEditing}
            icon={<Icon name="tint" size={20} color="#666" style={{ marginRight: 10 }} />}
          />

          <DropdownField
            label="Gender"
            value={profileData.gender}
            items={genderTypes}
            onSelect={(gender) => updateField('gender', gender)}
            placeholder="Select gender"
            error={errors.gender}
            disabled={!isEditing}
            icon={<FontAwesome name="users" size={20} color="#666" style={styles.inputIcon} />}
          />

          <InputText
            label="Email"
            value={profileData.email}
            editable={false}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputContainerStyle={[styles.inputField, styles.disabledInput]}
            leftIcon={<Feather name="mail" size={20} color="#666" style={styles.inputIcon} />}
          />

          <InputText
            label="Phone Number"
            value={profileData.phoneNumber}
            onChangeText={(text) => updateField('phoneNumber', text)}
            placeholder="Enter your phone number"
            editable={isEditing}
            error={errors.phoneNumber}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputContainerStyle={[
              styles.inputField,
              !isEditing && styles.disabledInput
            ]}
            leftIcon={<FontAwesome name="phone" size={20} color="#666" style={styles.inputIcon} />}
          />

          <View style={styles.actionContainer}>
            {isEditing ? (
              <>
                <CustomButton
                  title="Cancel"
                  onPress={() => setIsEditing(false)}
                  type="outline"
                  buttonStyle={styles.cancelButton}
                />
                <CustomButton
                  title={saving ? "Saving..." : "Save Changes"}
                  onPress={updateProfile}
                  loading={saving}
                  disabled={saving}
                  buttonStyle={styles.saveButton}
                />
              </>
            ) : (
              <CustomButton
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                fullWidth
                icon={<Feather name="edit" size={18} color="white" style={{ marginRight: 8 }} />}
                iconPosition="left"
              />
            )}
          </View>

          <CustomButton
            title="Logout"
            onPress={handleLogout}
            type="outline"
            buttonStyle={styles.logoutButton}
            textStyle={styles.logoutText}
            icon={<Feather name="log-out" size={18} color="#FF3B30" style={{ marginRight: 8 }} />}
            iconPosition="left"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileInfo;
