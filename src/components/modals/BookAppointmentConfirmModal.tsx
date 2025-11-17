import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../button/Button';
import moment from 'moment';

const { width } = Dimensions.get('window');

interface BookAppointmentConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    doctorName: string;
    doctorImage?: string;
    doctorSpecialization?: string;
    selectedDate: string | null;
    selectedTime: string | null;
    appointmentFee: string | number;
    loading: boolean;
}

const BookAppointmentConfirmModal: React.FC<BookAppointmentConfirmModalProps> = ({
    visible,
    onClose,
    onConfirm,
    doctorName,
    doctorImage,
    doctorSpecialization,
    selectedDate,
    selectedTime,
    appointmentFee,
    loading
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={22} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.headerContainer}>
                        <Icon name="calendar-check" size={32} color="#0066CC" />
                        <Text style={styles.headerText}>Confirm Appointment</Text>
                    </View>

                    <View style={styles.doctorInfo}>
                        <View style={styles.doctorImageContainer}>
                            {doctorImage ? (
                                <Image source={{ uri: doctorImage }} style={styles.doctorImage} />
                            ) : (
                                <Icon name="doctor" size={32} color="#0066CC" style={styles.doctorImage} />
                            )}
                        </View>
                        <View style={styles.doctorDetails}>
                            <Text style={styles.doctorName}>{doctorName}</Text>
                            {doctorSpecialization != '' &&
                                <Text style={styles.doctorSpecialty}>{doctorSpecialization}</Text>
                            }
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.appointmentDetails}>
                        <View style={styles.detailRow}>
                            <Icon name="calendar" size={20} color="#666" />
                            <Text style={styles.detailText}>
                                {moment(selectedDate).format('dddd, MMMM DD, YYYY')}
                            </Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="clock-outline" size={20} color="#666" />
                            <Text style={styles.detailText}>{selectedTime}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="cash" size={20} color="#666" />
                            <Text style={styles.detailText}>Fee: {appointmentFee}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Cancel"
                            onPress={onClose}
                            type="outline"
                            buttonStyle={styles.cancelButton}
                            disabled={loading}
                        />
                        <CustomButton
                            title="Confirm"
                            onPress={onConfirm}
                            loading={loading}
                            buttonStyle={styles.confirmButton}
                            textStyle={styles.confirmButtonText}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalView: {
        width: width * 0.9,
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    doctorImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 15,
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    doctorDetails: {
        flex: 1,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 16,
    },
    appointmentDetails: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
    },
    confirmButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#0066CC',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default BookAppointmentConfirmModal;
