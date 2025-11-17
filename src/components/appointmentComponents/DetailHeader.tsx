import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import styles from './styles';

interface DetailHeaderProps {
  type: 'doctor' | 'lab' | 'hos';
  name: string;
  image?: string;
  specialization?: string;
  experience?: string;
  rating?: string;
  address?: string;
  phoneNumber?: string;
  appointmentFee?: string | number;
  selectedDate?: string | Date;
  selectedTime?: string;
}

const DetailHeader = (props: DetailHeaderProps) => {
  const {
    type,
    name,
    image,
    specialization,
    experience,
    rating,
    address,
    phoneNumber,
    appointmentFee,
    selectedDate,
    selectedTime
  } = props;

  const isDoctorType = type === 'doctor';

  return (
    <View style={[styles.sectionContainer, type == 'hos' && { borderBottomWidth: 0 }]}>
      <View style={styles.detailInfoContainer}>
        {image ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.detailImage}
            />
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name={isDoctorType ? "doctor" : "flask"} size={40} color="#0066CC" />
          </View>
        )}

        <View style={styles.detailsContent}>
          <Text style={styles.detailName}>
            {isDoctorType ? `${name}` : name}
          </Text>

          {isDoctorType ? (
            <>
              {specialization && <Text style={styles.specialization}>{specialization}</Text>}
              {experience && <Text style={styles.experience}>{experience} experience</Text>}
              {rating && (
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
              )}
            </>
          ) : (
            <>
              {address && (
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <Text style={styles.infoText} numberOfLines={2}>{address}</Text>
                </View>
              )}
              {phoneNumber && (
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>{phoneNumber}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>

      {selectedTime && selectedDate &&
        <View style={styles.appointmentDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="calendar" size={18} color="#0066CC" />
            </View>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>
              {moment(selectedDate).format('dddd, MMMM D, YYYY')}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="clock-outline" size={18} color="#0066CC" />
            </View>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{selectedTime}</Text>
          </View>

          {appointmentFee && isDoctorType && (
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Icon name="cash" size={18} color="#0066CC" />
              </View>
              <Text style={styles.detailLabel}>Fee:</Text>
              <Text style={styles.detailValue}>Rs. {appointmentFee}</Text>
            </View>
          )}
        </View>}
    </View>
  );
};

export default DetailHeader;
