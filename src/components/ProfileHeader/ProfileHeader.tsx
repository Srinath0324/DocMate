import React from 'react';
import { View, Text, Image, Linking, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatTime } from '../../utils/Validations';
import CustomButton from '../button/Button';
import styles from './styles';

interface ProfileHeaderProps {
  name: string;
  address?: string;
  phoneNumber?: string;
  coverImage?: string | null;
  image?: string | null;
  openingTime?: string;
  closingTime?: string;
  iconName?: string;
  children?: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  address,
  phoneNumber,
  coverImage,
  image,
  openingTime,
  closingTime,
  iconName = 'medical',
  children
}) => {
  const handleCallPress = () => {
    if (phoneNumber) {
      const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
      Linking.openURL(`tel:${formattedPhoneNumber}`)
        .catch(err => {
          Alert.alert('Error', 'Could not open dial pad');
          console.error('Error opening dial pad:', err);
        });
    } else {
      Alert.alert('Info', 'Phone number not available');
    }
  };

  const handleLocationPress = () => {
    if (address) {
      const query = encodeURIComponent(address);
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      Linking.openURL(url)
        .catch(err => {
          Alert.alert('Error', 'Could not open maps');
          console.error('Error opening maps:', err);
        });
    } else {
      Alert.alert('Info', 'Address not available');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverImageContainer}>
        <Image
          source={{ uri: coverImage || 'https://via.placeholder.com/800x200' }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.logoContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.logo} />
        ) : (
          <View style={[styles.logo, styles.logoPlaceholder]}>
            <Ionicons name={iconName} size={40} color="#0066CC" />
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name || 'Name'}</Text>

        {address && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{address}</Text>
          </View>
        )}

        {phoneNumber && (
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{phoneNumber}</Text>
          </View>
        )}

        {children}

        <View style={styles.contactButtonsContainer}>
          <CustomButton
            textStyle={styles.contactButtonText}
            icon={
              <View style={styles.contactButtonIconContainer}>
                <Ionicons name="call" size={20} color="#fff" />
              </View>
            }
            buttonStyle={styles.contactButton}
            title='Call Now'
            onPress={handleCallPress}
          />

          <CustomButton
            textStyle={styles.contactButtonText}
            icon={
              <View style={styles.contactButtonIconContainer}>
                <Ionicons name="location" size={20} color="#fff" />
              </View>
            }
            buttonStyle={[styles.contactButton, styles.mapButton]}
            title='Directions'
            onPress={handleLocationPress}
          />
        </View>

        {(openingTime || closingTime) && (
          <View style={styles.hoursContainer}>
            <View style={styles.hoursItem}>
              <Text style={styles.hoursLabel}>Opening Time</Text>
              <Text style={styles.hoursValue}>{formatTime(openingTime)}</Text>
            </View>
            <View style={styles.hoursDivider} />
            <View style={styles.hoursItem}>
              <Text style={styles.hoursLabel}>Closing Time</Text>
              <Text style={styles.hoursValue}>{formatTime(closingTime)}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
