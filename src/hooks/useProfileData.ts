import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  getUserPersonalDetail,
  getBloodGroups,
  getGenderTypes
} from '../services/Get';
import { updateUserPersonalDetail } from '../services/Put';
import { formatDate, formatDateForApi, ProfileErrors, validateProfileForm } from '../utils/Validations';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface DropdownItem {
  id: number;
  name: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  dob: Date;
  dobString: string;
  email: string;
  cnic: string;
  phoneNumber: string;
  bloodGroup: DropdownItem;
  gender: DropdownItem;
}

export const useProfileData = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    dob: new Date(),
    dobString: '',
    email: '',
    cnic: '',
    phoneNumber: '',
    bloodGroup: { id: 0, name: '' },
    gender: { id: 0, name: '' }
  });

  const [bloodGroups, setBloodGroups] = useState<DropdownItem[]>([]);
  const [genderTypes, setGenderTypes] = useState<DropdownItem[]>([]);

  const [errors, setErrors] = useState<ProfileErrors>({
    firstName: '',
    lastName: '',
    dob: '',
    cnic: '',
    bloodGroup: '',
    gender: '',
    phoneNumber: ''
  });

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [profileRes, bloodGroupsRes, genderRes] = await Promise.all([
        getUserPersonalDetail(),
        getBloodGroups(),
        getGenderTypes()
      ]);

      if (profileRes && profileRes.data) {
        const profile = profileRes.data;

        let dobDate = new Date();
        let dobStr = '';

        if (profile.dob) {
          dobDate = new Date(profile.dob);
          dobStr = formatDate(dobDate);
        }

        let bloodGroup = { id: 0, name: '' };
        if (profile.bloodGroupId && bloodGroupsRes.data) {
          const bg = bloodGroupsRes.data.find((bg: any) => bg.id === profile.bloodGroupId);
          if (bg) {
            bloodGroup = { id: bg.id, name: bg.groupName };
          }
        }

        let gender = { id: 0, name: '' };
        if (profile.genderId && genderRes.data) {
          const g = genderRes.data.find((g: any) => g.id === profile.genderId);
          if (g) {
            gender = { id: g.id, name: g.genderName };
          }
        }

        setProfileData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          dob: dobDate,
          dobString: dobStr,
          email: profile.email || '',
          cnic: profile.cnic || '',
          phoneNumber: profile.phoneNumber || '',
          bloodGroup,
          gender
        });
      }

      if (bloodGroupsRes && bloodGroupsRes.data) {
        setBloodGroups(bloodGroupsRes.data.map((bg: any) => ({
          id: bg.id,
          name: bg.groupName
        })));
      }

      if (genderRes && genderRes.data) {
        setGenderTypes(genderRes.data.map((g: any) => ({
          id: g.id,
          name: g.genderName
        })));
      }
    } catch (error) {
      if (error && error == 'Unauthorized User! Please Login again.') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login', params: { fromProfile: true } }],
          })
        );
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    const { isValid, errors } = validateProfileForm(
      profileData.firstName,
      profileData.lastName,
      profileData.dobString,
      profileData.cnic,
      profileData.bloodGroup,
      profileData.gender,
      profileData.phoneNumber
    );

    setErrors(errors);

    if (!isValid) {
      return false;
    }

    try {
      setSaving(true);

      const updateData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        dob: formatDateForApi(profileData.dob),
        bloodGroupId: profileData.bloodGroup.id,
        genderId: profileData.gender.id,
        cnic: profileData.cnic
      };

      const response = await updateUserPersonalDetail(updateData);

      if (response && response.status === 'Success') {
        Alert.alert('Success', 'Profile updated successfully');
        setIsEditing(false);
        fetchInitialData(); 
        return true;
      }
    } catch (error) {
      if (error && error == 'Unauthorized User! Please Login again.') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login', params: { fromProfile: true } }],
          })
        );
      }
      console.error(error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));

    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateDate = (date: Date) => {
    setProfileData(prev => ({
      ...prev,
      dob: date,
      dobString: formatDate(date)
    }));
    setErrors(prev => ({ ...prev, dob: '' }));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return {
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
    updateProfile,
    fetchInitialData
  };
};
