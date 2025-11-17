import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface DoctorCardProps {
  name: string;
  image: string | null;
  field: string;
  experience: string | number;
  rating?: number;
  Style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const DoctorCard = ({
  name,
  image,
  field,
  experience,
  rating,
  onPress,
  Style
}: DoctorCardProps) => {
  const formattedExperience = typeof experience === 'number'
    ? `${experience} ${experience === 1 ? 'year' : 'years'}`
    : experience;

  return (
    <TouchableOpacity style={[styles.card, Style]} onPress={onPress}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="person" size={36} color="#0C53B7" />
          </View>
        )}
        
        {rating !== undefined && rating !== null && rating > 0 && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#fff" />
            <Text style={styles.ratingBadgeText}>{rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.field} numberOfLines={1}>{field}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="briefcase-outline" size={14} color="#666" />
          <Text style={styles.infoText}>{formattedExperience}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width / 2.4,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D1E9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  ratingBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 3,
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  field: {
    fontSize: 13,
    color: '#0066CC',
    fontWeight: '500',
  },
  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
  },
});

export default DoctorCard;
