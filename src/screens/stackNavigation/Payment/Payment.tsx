import { View, Text, Image, Alert, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

import Theme from '../../../theme/Theme';
import styles from './styles';
import { requestGalleryPermission, requestStoragePermission } from '../../../api/api';
import PaymentContent from './PaymentContent';

const Payment = () => {
  const navigation: any = useNavigation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigateToAppointment = () => {
    navigation.navigate('AppointmentScreen');
  };

  const saveToGallery = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      
      if (!hasPermission) {
        Alert.alert(
          "Permission Required",
          "To save images, please grant storage permissions from your device settings.",
          [{ text: "Cancel", style: "cancel" }]
        );
        return;
      }

      const imageUri = Image.resolveAssetSource(Theme.IMAGES.qrCode).uri;
      if (Platform.OS === 'android') {
        const fileName = `payment_qr_${Date.now()}.png`;
        const apiLevel = Platform.Version;
        let destPath;
        if (apiLevel >= 29) {
          destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        } else {
          destPath = `${RNFS.PicturesDirectoryPath}/${fileName}`;
        }
        
        if (imageUri.startsWith('http')) {
          const downloadOptions = {
            fromUrl: imageUri,
            toFile: destPath,
          };
          
          const downloadResult = await RNFS.downloadFile(downloadOptions).promise;
          
          if (downloadResult.statusCode === 200) {
            await RNFS.scanFile(destPath);
            Alert.alert("Success", "QR Code saved to gallery!");
          } else {
            throw new Error(`Download failed with status ${downloadResult.statusCode}`);
          }
        } 
        else {
          if (imageUri.startsWith('asset://')) {
            const assetPath = imageUri.replace('asset://', '');
            await RNFS.copyFile(assetPath, destPath);
          } else {
            await RNFS.copyFile(imageUri, destPath);
          }
          
          await RNFS.scanFile(destPath);
          Alert.alert("Success", "QR Code saved to gallery!");
        }
      } 
      else if (Platform.OS === 'ios') {
      }
    } catch (error:any) {
      console.log('Error saving to gallery:', error);
      Alert.alert('Error', `Could not save the QR code: ${error?.message}`);
    }
  };

  const selectImage = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      
      if (!hasPermission) {
        Alert.alert(
          "Permission Required",
          "To upload images, please grant gallery access permissions.",
          [{ text: "Cancel", style: "cancel" }]
        );
        return;
      }

      const image = await ImagePicker.openPicker({
        width: 1000,
        height: 1000,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      console.log('Image selected:', image.path);
      setSelectedImage(image.path || null);
      setIsSubmitted(false);
      
    } catch (error:any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('Error selecting image:', error);
        Alert.alert('Error', 'Could not select image. Please try again.');
      }
    }
  };

  const submitImage = () => {
    console.log('Submitting image:', selectedImage);
    setIsSubmitted(true);
    Alert.alert('Success', 'Your payment receipt has been submitted successfully!');
  };

  const editImage = () => {
    setIsSubmitted(false);
    selectImage();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payment Information</Text>
        </View>

        <PaymentContent
          selectedImage={selectedImage}
          isSubmitted={isSubmitted}
          saveToGallery={saveToGallery}
          selectImage={selectImage}
          submitImage={submitImage}
          editImage={editImage}
          navigateToAppointment={navigateToAppointment}
        />
      </ScrollView>
    </View>
  );
};

export default Payment;