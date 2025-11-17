import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FacilityCardProps {
    name: string;
    image: string | null;
    openingTime: string;
    closingTime: string;
    phone: string;
    doctorCount?: number;
    onPress?: () => void;
    type: 'lab' | 'hospital' | 'clinic';
}

const formatTime = (time: string) => {
    if (!time) return 'N/A';

    try {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (error) {
        return time;
    }
};

const FacilityCard = ({
    name,
    image,
    openingTime,
    closingTime,
    phone,
    doctorCount,
    onPress,
    type
}: FacilityCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={[styles.imageContainer, type === 'hospital' && { height: 128 }]}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={[styles.placeholderImage, { backgroundColor: type === 'lab' ? '#D1E9FC' : type === 'hospital' ? '#D0F2FF' : '#FFF7CD' }]}>
                        <Ionicons
                            name={type === 'lab' ? 'flask' : type === 'hospital' ? 'medkit' : 'medical'}
                            size={40}
                            color={type === 'lab' ? '#0C53B7' : type === 'hospital' ? '#04297A' : '#7A4F01'}
                        />
                    </View>
                )}
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.name} numberOfLines={2}>{name}</Text>

                {type === 'hospital' && doctorCount !== undefined && (
                    <View style={styles.infoRow}>
                        <Ionicons name="people-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>{doctorCount} {doctorCount === 1 ? 'Doctor' : 'Doctors'}</Text>
                    </View>
                )}

                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>
                        {formatTime(openingTime)} - {formatTime(closingTime)}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>{phone || 'N/A'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        width: 100,
        height: 120,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    infoText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#666',
    },
});

export default FacilityCard;
