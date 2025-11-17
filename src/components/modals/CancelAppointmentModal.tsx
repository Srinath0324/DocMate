import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
} from 'react-native';
import CustomButton from '../button/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CancelAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
  loading?: boolean;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  visible,
  onClose,
  onConfirmCancel,
  loading = false,
}) => {
  const iconSize = 80;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Icon 
              name="calendar-remove" 
              size={iconSize} 
              color="#FF3B30" 
            />
          </View>
          
          <Text style={styles.title}>Cancel Appointment</Text>
          
          <Text style={styles.message}>
            Are you sure you want to cancel this appointment?
          </Text>
          
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Keep Appointment"
                onPress={onClose}
                type="outline"
                size="medium"
                fullWidth
                disabled={loading}
              />
            </View>
            
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Yes, Cancel"
                onPress={onConfirmCancel}
                type="success"
                size="medium"
                fullWidth
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 16,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  buttonWrapper: {
    marginBottom: 12,
    width: '100%',
  },
});

export default CancelAppointmentModal;
