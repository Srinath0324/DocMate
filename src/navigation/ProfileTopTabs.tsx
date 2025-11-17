import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Platform, } from 'react-native';
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Dependent from '../screens/bottomStack/Profile/Dependent';
import ProfileInfo from '../screens/bottomStack/Profile/ProfileInfo';
import Theme from '../theme/Theme';
import { getToken } from '../api/api';
import { getUserProfile } from '../services/Get';
import { updateUserProfile } from '../services/Put';
import { checkPermissionCamera } from '../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

const ProfileHeader = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const fetchUserProfile = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await getUserProfile();
      if (response && response.status === 'Success') {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Choose Image Source',
      'Select an option to upload your profile picture',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
      ]
    );
  }

  const openCamera = async () => {
    try {
      const permissionResult = await checkPermissionCamera();
      if (!permissionResult || !permissionResult.result) {
        Alert.alert('Permission Denied', 'You need to grant camera permissions to take photos');
        return;
      }

      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      }).then(image => {
        uploadImage(image);
      }).catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Camera Error:', error);
          Alert.alert('Error', 'Failed to open camera');
        }
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      Alert.alert('Error', 'Failed to access camera');
    }
  }

  const openGallery = async () => {
    try {
      const permissionResult = await checkPermissionCamera();
      if (!permissionResult || !permissionResult.result) {
        Alert.alert('Permission Denied', 'You need to grant gallery permissions to select photos');
        return;
      }
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      }).then(image => {
        uploadImage(image);
      }).catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Gallery Error:', error);
          Alert.alert('Error', 'Failed to open gallery');
        }
      });
    } catch (error) {
      console.error('Error accessing gallery:', error);
      Alert.alert('Error', 'Failed to access gallery');
    }
  };

  const uploadImage = async (image: any) => {
    try {
      const filename = image.path.replace(/^.*[\\\/]/, '');
      const formData: any = new FormData();
      formData.append('UploadImage', {
        uri: image.path,
        type: image.mime,
        name: filename,
      });

      setLoading(true);
      const response = await updateUserProfile(formData);

      if (response && response.status === 'Success') {
        Alert.alert('Success', 'Profile picture updated successfully');
        fetchUserProfile();
      } else {
        Alert.alert('Error', 'Failed to update profile picture');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={handleImageUpload}>
        <Image
          source={profileData?.image ? { uri: profileData.image } : Theme.IMAGES.doctor}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ProfileNavigator = () => {
  const navigation = useNavigation<any>();
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      setToken(token);
      if (!token) {
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login', params: { fromProfile: true } }],
            })
          );
        }, 0);
      }
    };
    checkAuth();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#0066CC',
          tabBarInactiveTintColor: '#999',
          tabBarIndicatorStyle: { backgroundColor: '#0066CC', height: 3 },
          tabBarLabelStyle: { fontWeight: '500' },
          tabBarStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#eee' },
        }}
        tabBarPosition="top"
        initialLayout={{ width }}
      >
        <Tab.Screen name="Dependent" component={Dependent} />
        <Tab.Screen name="Profile" component={ProfileInfo} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
});

export default ProfileNavigator;
