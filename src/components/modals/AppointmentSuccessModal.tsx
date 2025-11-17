import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../button/Button';

const { width } = Dimensions.get('window');

interface AppointmentSuccessModalProps {
  type?: string
  visible: boolean;
  onClose: () => void;
  onGoToPayment: () => void;
}

const AppointmentSuccessModal: React.FC<AppointmentSuccessModalProps> = ({
  visible,
  type,
  onClose,
  onGoToPayment
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
          <View style={styles.animationContainer}>
            <View style={styles.successIconContainer}>
              <Icon name="check-circle" size={100} color="#4CAF50" />
            </View>
          </View>

          <Text style={styles.successTitle}>Booking Successful!</Text>
          <Text style={styles.successMessage}>
            Your appointment has been booked successfully. You can view the details in your appointment history.
          </Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="View My Appointments"
              onPress={onClose}
              buttonStyle={styles.viewAppointmentsButton}
              textStyle={styles.viewAppointmentsButtonText}
            />

            {type == 'doctor' && <CustomButton
              title="Go to Payment"
              onPress={onGoToPayment}
              buttonStyle={styles.paymentButton}
              textStyle={styles.paymentButtonText}
            />}
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
    alignItems: 'center',
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
  animationContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  animation: {
    width: 120,
    height: 120,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    gap: 10, // Add spacing between buttons
  },
  viewAppointmentsButton: {
    backgroundColor: '#0066CC',
  },
  viewAppointmentsButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  paymentButton: {
    backgroundColor: '#FF9800',  // Orange color for payment button
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default AppointmentSuccessModal;
